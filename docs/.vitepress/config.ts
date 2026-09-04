import { defineConfig } from 'vitepress'
import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  title: 'agentbox',
  description:
    'Essays, design notes, and ongoing explorations of infrastructure for AI agents.',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'script',
      {},
      `if (/^#\\/(register|verify|dashboard|claim|config)(?:[/?]|$)/.test(location.hash)) location.replace('/mailbox')`,
    ],
  ],

  async buildEnd(siteConfig) {
    await mkdir(resolve(siteConfig.outDir, 'setup'), { recursive: true })
    await Promise.all([
      copyFile(resolve(docsRoot, 'static/skill.txt'), resolve(siteConfig.outDir, 'skill.md')),
      copyFile(
        resolve(docsRoot, 'static/soul-loader.txt'),
        resolve(siteConfig.outDir, 'setup/soul-loader.md'),
      ),
    ])
  },

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
      { text: 'Product retrospective', link: '/background/from-mailbox-to-agent-first' },
      { text: 'Protocols', link: 'https://github.com/imphillip/agentbox/tree/main/protocols' },
    ],

    sidebar: {
      '/background/': [
        {
          text: 'Background',
          items: [
            { text: 'Overview', link: '/background/' },
            {
              text: 'When Intelligence Becomes Abundant, What Remains Scarce?',
              link: '/background/when-intelligence-becomes-abundant',
            },
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
            {
              text: 'From mailbox to directory to agent-first',
              link: '/background/from-mailbox-to-agent-first',
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
      message: 'An ongoing exploration of infrastructure for AI agents. Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2026 agentbox.id',
    },
  },
})
