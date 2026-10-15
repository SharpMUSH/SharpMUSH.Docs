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
                      { label: 'Migrate from another MUSH', slug: 'guides/pennmush-migration' },
                      { label: 'Operator Handbook', slug: 'guides/operator-handbook' },
                      { label: 'Deployment Reference', slug: 'guides/deployment' },
                      { label: 'Secrets', slug: 'guides/secrets' },
                      { label: 'Listing Your Game', slug: 'guides/mssp' },
                      { label: 'Develop SharpMUSH', slug: 'guides/local-install' },
                      { label: 'The Web Portal', slug: 'guides/web-portal' },
                      { label: 'Portal Applications', slug: 'guides/applications' },
                      { label: 'Visual Layouts and Themes', slug: 'guides/visual-layouts' },
                      { label: 'Layout Themes', slug: 'guides/layout-themes' },
                      { label: 'Portal Themes', slug: 'guides/portal-themes' },
                      { label: 'Colour Vision', slug: 'guides/colour-vision' },
                      { label: 'Scene Pose Types', slug: 'guides/scene-pose-types' },
                      { label: 'Scene Details', slug: 'guides/scene-details' },
                      { label: 'Scene Availability', slug: 'guides/scene-availability' },
                      { label: 'Scene Safety', slug: 'guides/scene-safety' },
                      { label: 'Scenes on a Phone', slug: 'guides/scenes-on-a-phone' },
                      { label: 'Screen Readers', slug: 'guides/screen-readers' },
                      { label: 'Softcode Packages', slug: 'guides/packages' },
                      { label: 'Game Settings with +config', slug: 'guides/config' },
                      { label: 'Versioning Packages', slug: 'guides/versioning' },
                      { label: 'Named Arguments', slug: 'guides/named-arguments' },
                      { label: 'Calling Web Services', slug: 'guides/web-requests' },
                      { label: 'RhostMUSH Softcode', slug: 'guides/rhostmush-softcode' },
                      { label: 'TinyMUX Softcode', slug: 'guides/tinymux-softcode' },
                      { label: 'Chat Cards', slug: 'guides/chat-cards' },
                      { label: 'The Command Palette', slug: 'guides/command-palette' },
                      { label: 'Events', slug: 'guides/events' },
                      { label: 'Bulletin Boards', slug: 'guides/bboards' },
                      { label: 'Jobs That Run Themselves', slug: 'guides/jobs-automation' },
                      { label: 'Character Galleries', slug: 'guides/galleries' },
                      { label: 'Status', slug: 'guides/status' },
                      { label: 'Watch List', slug: 'guides/watch' },
                      { label: 'Character Applications', slug: 'guides/character-applications' },
                      { label: 'Highlights', slug: 'guides/highlights' },
                      { label: 'Notifications', slug: 'guides/notifications' },
                      { label: 'Who and Where', slug: 'guides/who-where' },
                      { label: 'Letting Your Players Build', slug: 'guides/player-building' },
                      { label: 'Mapping Your Rooms', slug: 'guides/builder-graph' },
                      { label: 'Finger Profiles', slug: 'guides/finger' },
                      { label: 'Character Roster', slug: 'guides/roster' },
                      { label: 'Time and Time Zones', slug: 'guides/time' },
                      { label: 'Info Files and Journals', slug: 'guides/info' },
                      { label: 'IC Dates and Timelines', slug: 'guides/timeline' },
                      { label: 'Game Health', slug: 'guides/health' },
                      { label: 'Discord', slug: 'guides/discord' },
                      { label: 'Writing Plugins', slug: 'guides/plugins' },
                      { label: 'Softcode in Your Editor', slug: 'guides/editor-support' },
                      { label: 'Remote MCP and LSP Analysis', slug: 'guides/mcp' }
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
