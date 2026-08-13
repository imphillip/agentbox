import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'the agentbox archive',
  description:
    'Essays and design records from the discontinued agentbox.id experiment.',
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
      { text: 'Essays', link: '/background/' },
      { text: 'Mailbox experiment', link: '/mailbox' },
      { text: 'Protocols', link: 'https://github.com/imphillip/agentbox/tree/main/protocols' },
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
            {
              text: 'You have to have a soul to have a mailbox',
              link: '/background/you-have-to-have-a-soul',
            },
            {
              text: "What's in the box?",
              link: '/background/whats-in-the-box',
            },
            {
              text: 'Most of an autonomous agent is missing.',
              link: '/background/most-of-an-agent-is-missing',
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
      message: 'An archive of the 2026 agentbox experiment. Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2026 agentbox.id',
    },
  },
})
