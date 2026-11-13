// Inlines the guide diagrams (src/assets/guide/*.svg) into the page, so they draw with the site's
// --dg-* colour tokens and follow its light and dark themes. An <img> cannot see the page's theme.
//
// A paragraph holding nothing but `![alt](…/assets/guide/<name>.svg)` becomes
// <figure class="diagram"><svg aria-label="alt" …></figure>. Each diagram's ids are prefixed with its
// file name, and the rules in its <style> are scoped to it, so two diagrams on one page cannot clash.
import fs from 'node:fs';
import path from 'node:path';
import { fromHtml } from 'hast-util-from-html';

/** Pictures that show real colours (a theme's own palette), kept as images. */
export const KEEP_AS_IMAGE = new Set(['layout-themes-samples.svg']);

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Prefixes every top-level rule's selectors with the diagram's root id. */
function scopeCss(css, rootId) {
	let out = '';
	let depth = 0;
	let selector = '';
	for (const ch of css) {
		if (depth === 0 && ch === '{') {
			const trimmed = selector.trim();
			out += trimmed.startsWith('@')
				? trimmed
				: trimmed
						.split(',')
						.map((part) => part.trim())
						.map((part) => (part.startsWith(`#${rootId}`) ? part : `#${rootId} ${part}`))
						.join(',');
			out += '{';
			selector = '';
			depth = 1;
		} else if (depth === 0) {
			selector += ch;
		} else {
			if (ch === '{') depth++;
			if (ch === '}') depth--;
			out += ch;
		}
	}
	return out + selector;
}

export function prepareSvg(text, slug, label) {
	if (!label.trim()) throw new Error(`${slug}.svg needs alt text: it is the diagram's only label`);
	const ids = [...text.matchAll(/\sid=(["'])([^"']+)\1/g)].map((m) => m[2]);
	for (const id of ids) {
		const ref = escapeRegExp(id);
		text = text
			.replace(new RegExp(`(\\sid=(["']))${ref}\\2`, 'g'), `$1${slug}-${id}$2`)
			.replace(new RegExp(`url\\(#${ref}\\)`, 'g'), `url(#${slug}-${id})`)
			.replace(new RegExp(`(href=(["']))#${ref}\\2`, 'g'), `$1#${slug}-${id}$2`)
			// Id selectors live only in <style>; text elsewhere (a label such as "#d") is left alone.
			.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, open, css, close) =>
				open + css.replace(new RegExp(`#${ref}(?![\\w-])`, 'g'), `#${slug}-${id}`) + close);
	}
	text = text.replace(/\saria-(labelledby|describedby|roledescription)="[^"]*"/g, '');
	const tree = fromHtml(text, { fragment: true });
	const svg = tree.children.find((node) => node.type === 'element' && node.tagName === 'svg');
	if (!svg) throw new Error(`${slug}.svg has no <svg> element`);
	const props = svg.properties;
	props.id ??= slug;
	const width = props.width;
	delete props.width;
	delete props.height;
	props.role = 'img';
	props.ariaLabel = label;
	props.style = [width ? `max-width:${width}px` : '', props.style ?? ''].filter(Boolean).join(';');
	visitStyles(svg, (node) => {
		for (const child of node.children) {
			if (child.type === 'text') child.value = scopeCss(child.value, props.id);
		}
	});
	return svg;
}

function visitStyles(node, fn) {
	if (node.type === 'element' && node.tagName === 'style') fn(node);
	for (const child of node.children ?? []) visitStyles(child, fn);
}

function diagramPath(image, file) {
	if (!image.url.endsWith('.svg') || !image.url.includes('assets/guide/')) return null;
	if (KEEP_AS_IMAGE.has(path.basename(image.url))) return null;
	return path.resolve(path.dirname(file.path), image.url);
}

export default function remarkInlineDiagrams() {
	return (tree, file) => {
		// A diagram shown twice on one page gets a second prefix, so its ids stay unique.
		const seen = new Map();
		const walk = (parent) => {
			parent.children?.forEach((node, index) => {
				if (node.type === 'paragraph') {
					const content = node.children.filter((child) => !(child.type === 'text' && !child.value.trim()));
					const image = content.length === 1 && content[0].type === 'image' ? content[0] : null;
					const source = image && diagramPath(image, file);
					if (source) {
						const name = path.basename(source, '.svg');
						const count = (seen.get(name) ?? 0) + 1;
						seen.set(name, count);
						const slug = count === 1 ? name : `${name}-${count}`;
						parent.children[index] = {
							type: 'diagram',
							data: {
								hName: 'figure',
								hProperties: { className: ['diagram'] },
								hChildren: [prepareSvg(fs.readFileSync(source, 'utf8'), slug, image.alt ?? '')],
							},
						};
						return;
					}
				}
				walk(node);
			});
		};
		walk(tree);
	};
}
