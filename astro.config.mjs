// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://sharpmush.com',
  integrations: [
      starlight({
          title: 'SharpMUSH',
          logo: { src : './src/assets/logo.svg' },
          customCss: ['./src/styles/colors.css'],
          social: [
              {
                  label: 'GitHub',
                  icon: 'github',
                  href: 'https://github.com/SharpMUSH/SharpMUSH',
              },
              {
                  label: 'Discord',
                  icon: 'discord',
                  href: 'https://discord.com/invite/jYErRbqaC9',
              },
          ],
          sidebar: [
              {
                label: 'About SharpMUSH',
                items: [
                    { label: 'What is SharpMUSH',slug: 'about/what-is' },
                    { label: 'Design Premise',slug: 'about/design-premise' },
                    { label: 'Live Example Game', link: 'https://mush.sharpmush.com', attrs: { target: '_blank', rel: 'noopener' } }
                ]
              },
              {
                  label: 'Guides',
                  items: [
                      // Each item here is one entry in the navigation menu.
                      { label: 'Get Started', slug: 'guides/get-started' },
                      { label: 'Run with Docker', slug: 'guides/docker-quickstart' },
                      { label: 'Migrate from PennMUSH', slug: 'guides/pennmush-migration' },
                      { label: 'Operator Handbook', slug: 'guides/operator-handbook' },
                      { label: 'Deployment Reference', slug: 'guides/deployment' },
                      { label: 'Develop SharpMUSH', slug: 'guides/local-install' },
                      { label: 'The Web Portal', slug: 'guides/web-portal' },
                      { label: 'Portal Applications', slug: 'guides/applications' },
                      { label: 'Visual Layouts and Themes', slug: 'guides/visual-layouts' },
                      { label: 'Layout Themes', slug: 'guides/layout-themes' },
                      { label: 'Portal Themes', slug: 'guides/portal-themes' },
                      { label: 'Colour Vision', slug: 'guides/colour-vision' },
                      { label: 'Softcode Packages', slug: 'guides/packages' },
                      { label: 'Writing Plugins', slug: 'guides/plugins' },
                      { label: 'Softcode in Your Editor', slug: 'guides/editor-support' }
                  ],
              },
              {
                  label: 'Reference',
                  items: [
                    { label: 'Features', slug: 'reference/features'},
                    { label: 'Compatibility', slug: 'reference/compatibility'},
                    { label: 'Comparison', slug: 'reference/comparison'},
                    { label: 'Package Format', slug: 'reference/package-format'},
                    { label: 'SharpMUSH Helpfiles', autogenerate: { directory: 'reference/sharpmush-help', collapsed: true }},
                    {
                      label: 'Technical',
                      items: [
                        { label: 'Architecture', slug: 'technical/architecture' },
                        { label: 'Connections During Updates', slug: 'technical/connections' },
                        { label: 'How Plugins Load', slug: 'technical/plugin-system' },
                      ]
                    },
                  ]
              },
          ],
      }),
	],

  adapter: netlify(),
});
