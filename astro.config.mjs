// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'SharpMUSH',
          logo: { src : './src/assets/logo.svg' },
          customCss: ['./src/styles/colors.css'],
          social: {
              github: 'https://github.com/SharpMUSH/SharpMUSH',
              discord: 'https://discord.com/invite/jYErRbqaC9',
          },
          sidebar: [
              {
                  label: 'Guides',
                  items: [
                      // Each item here is one entry in the navigation menu.
                      { label: 'Get Started', slug: 'guides/get-started' },
                      { label: 'Install for Development', slug: 'guides/local-install' }
                  ],
              },
              {
                  label: 'Reference',
                  items: [
                    { label: 'Compatibility', slug: 'reference/compatibility'},
                    { label: 'Comparison', slug: 'reference/comparison'},
                    {label: 'SharpMUSH Helpfiles', autogenerate: { directory: 'reference/sharpmush-help' }}
                  ]
              },
          ],
      }),
	],

  adapter: netlify(),
});