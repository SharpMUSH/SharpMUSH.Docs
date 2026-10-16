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
                  label: 'Run a Game',
                  items: [
                      { label: 'Get Started', slug: 'guides/get-started' },
                      { label: 'Run with Docker', slug: 'guides/docker-quickstart' },
                      { label: 'Migrate from another MUSH', slug: 'guides/pennmush-migration' },
                      { label: 'Operator Handbook', slug: 'guides/operator-handbook' },
                      { label: 'Deployment Reference', slug: 'guides/deployment' },
                      { label: 'Storage and History Retention', slug: 'guides/storage-and-retention' },
                      { label: 'Secrets', slug: 'guides/secrets' },
                      { label: 'Listing Your Game', slug: 'guides/mssp' },
                      { label: 'Letting Your Players Build', slug: 'guides/player-building' },
                      { label: 'Mapping Your Rooms', slug: 'guides/builder-graph' },
                  ],
              },
              {
                  label: 'Web Portal',
                  items: [
                      { label: 'The Web Portal', slug: 'guides/web-portal' },
                      { label: 'Portal Applications', slug: 'guides/applications' },
                      { label: 'Building Portal Applications', slug: 'guides/building-applications' },
                      { label: 'Character Galleries', slug: 'guides/galleries' },
                      { label: 'The Command Palette', slug: 'guides/command-palette' },
                      { label: 'Chat Cards', slug: 'guides/chat-cards' },
                      { label: 'Portal Themes', slug: 'guides/portal-themes' },
                  ],
              },
              {
                  label: 'Look and Access',
                  items: [
                      { label: 'Visual Layouts and Images', slug: 'guides/visual-layouts' },
                      { label: 'Layout Themes', slug: 'guides/layout-themes' },
                      { label: 'Colour Vision', slug: 'guides/colour-vision' },
                      { label: 'Screen Readers', slug: 'guides/screen-readers' },
                  ],
              },
              {
                  label: 'Write Softcode',
                  items: [
                      { label: 'Softcode Packages', slug: 'guides/packages' },
                      { label: 'Versioning Packages', slug: 'guides/versioning' },
                      { label: 'Game Settings with +config', slug: 'guides/config' },
                      { label: 'Named Arguments', slug: 'guides/named-arguments' },
                      { label: 'Events', slug: 'guides/events' },
                      { label: 'Extension Points', slug: 'guides/extension-points' },
                      { label: 'Bridge Packages', slug: 'guides/bridge-packages' },
                      { label: 'Attribute Indexes', slug: 'guides/attribute-indexes' },
                      { label: 'Calling Web Services', slug: 'guides/web-requests' },
                      { label: 'RhostMUSH Softcode', slug: 'guides/rhostmush-softcode' },
                      { label: 'TinyMUX Softcode', slug: 'guides/tinymux-softcode' },
                      { label: 'Softcode in Your Editor', slug: 'guides/editor-support' },
                      { label: 'Remote MCP and LSP Analysis', slug: 'guides/mcp' },
                  ],
              },
              {
                  label: 'Extend the Server',
                  items: [
                      { label: 'Writing Plugins', slug: 'guides/plugins' },
                      { label: 'Develop SharpMUSH', slug: 'guides/local-install' },
                  ],
              },
              {
                  label: 'Packages',
                  items: [
                      {
                          label: 'Essentials',
                          collapsed: true,
                          items: [
                              { label: 'Game Help with +help', slug: 'guides/game-help' },
                          ],
                      },
                      {
                          label: 'Scenes',
                          collapsed: true,
                          items: [
                              { label: 'Scenes', slug: 'guides/scenes' },
                              { label: 'Scene Pose Types', slug: 'guides/scene-pose-types' },
                              { label: 'Scene Details', slug: 'guides/scene-details' },
                              { label: 'Scene Availability', slug: 'guides/scene-availability' },
                              { label: 'Scene Safety', slug: 'guides/scene-safety' },
                              { label: 'Scenes on a Phone', slug: 'guides/scenes-on-a-phone' },
                              { label: 'Highlights', slug: 'guides/highlights' },
                              { label: 'Pose Summaries', slug: 'guides/summary' },
                              { label: 'Time and Time Zones', slug: 'guides/time' },
                              { label: 'IC Dates and Timelines', slug: 'guides/timeline' },
                          ],
                      },
                      {
                          label: 'Characters',
                          collapsed: true,
                          items: [
                              { label: 'Character Applications', slug: 'guides/character-applications' },
                              { label: 'Finger Profiles', slug: 'guides/finger' },
                              { label: 'Info Files and Journals', slug: 'guides/info' },
                              { label: 'Relationships', slug: 'guides/relationships' },
                              { label: 'Character Roster', slug: 'guides/roster' },
                              { label: 'Alts', slug: 'guides/alts' },
                          ],
                      },
                      {
                          label: 'Community',
                          collapsed: true,
                          items: [
                              { label: 'Who and Where', slug: 'guides/who-where' },
                              { label: 'Status', slug: 'guides/status' },
                              { label: 'Watch List', slug: 'guides/watch' },
                              { label: 'Notifications', slug: 'guides/notifications' },
                              { label: 'Bulletin Boards', slug: 'guides/bboards' },
                              { label: 'Discord', slug: 'guides/discord' },
                              { label: 'Discord for Players', slug: 'guides/discord-players' },
                          ],
                      },
                      {
                          label: 'Staff',
                          collapsed: true,
                          items: [
                              { label: 'Jobs That Run Themselves', slug: 'guides/jobs-automation' },
                              { label: 'Game Health', slug: 'guides/health' },
                          ],
                      },
                      {
                          label: 'MUD Clients',
                          collapsed: true,
                          items: [
                              { label: 'Supporting MUD Clients', slug: 'guides/mud-clients' },
                              { label: 'MUD Kit Packages', slug: 'guides/mud-kit' },
                              { label: 'Sounds and GMCP Softcode', slug: 'guides/gmcp-softcode' },
                          ],
                      },
                  ],
              },
              {
                  label: 'Reference',
                  items: [
                    { label: 'Features', slug: 'reference/features'},
                    { label: 'Compatibility', slug: 'reference/compatibility'},
                    { label: 'Comparison', slug: 'reference/comparison'},
                    { label: 'Package Format', slug: 'reference/package-format'},
                    { label: 'Package Declarations', slug: 'reference/package-declarations'},
                    { label: 'Application, Plugin and UI Packages', slug: 'reference/package-kinds'},
                    { label: 'Portal Theme Parts', slug: 'reference/portal-theme-parts'},
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
