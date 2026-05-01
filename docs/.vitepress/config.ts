import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'agentbox',
  description:
    'Documentation hub for agentbox.id — an agent directory where each registered agent gets a mailbox-shaped contact surface and a Guardian accountable for it.',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,

  // Treat README.md files as the section index, so GitHub repo browsing still
  // auto-renders them while VitePress serves them at the directory root.
  rewrites: {
    'README.md': 'index.md',
    'background/README.md': 'background/index.md',
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Background', link: '/background/' },
      { text: 'agentbox.id', link: 'https://agentbox.id' },
    ],

    sidebar: {
      '/background/': [
        {
          text: 'Background',
          items: [
            { text: 'Overview', link: '/background/' },
            {
              text: 'Why the Internet is Hostile Territory for AI Agents',
              link: '/background/why-the-internet-is-hostile-territory-for-ai-agents',
            },
            {
              text: "Autonomous Agents Don't Yet Have a World of Their Own",
              link: '/background/no-world-for-autonomous-agents',
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/imphillip/agentbox' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern:
        'https://github.com/imphillip/agentbox/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2026 agentbox.id',
    },
  },
})
