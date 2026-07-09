// @ts-check
import { defineConfig } from 'astro/config'

import node from '@astrojs/node'

// Standalone coming-soon holding page for blazingowl.co.uk.
// Node standalone adapter — the proven Railway pattern from the main repo.
// https://astro.build/config
export default defineConfig({
	site: 'https://blazingowl.co.uk',
	adapter: node({ mode: 'standalone' }),
	security: {
		// Behind Railway's proxy the container serves plain HTTP; Astro 6 only
		// trusts X-Forwarded-Proto/Host for hosts declared here. This page has no
		// form POSTs, but carrying the main repo's allowedDomains lesson forward
		// is free insurance against the CSRF checkOrigin 403 (learned 2026-07-08).
		allowedDomains: [
			{ hostname: '**.up.railway.app', protocol: 'https' },
			{ hostname: 'blazingowl.co.uk', protocol: 'https' },
			{ hostname: '**.blazingowl.co.uk', protocol: 'https' },
		],
	},
	vite: {
		// Railway serves the standalone node entry on a dynamic *.up.railway.app
		// domain; allow any host for local `astro preview` (Vite gates by Host).
		preview: {
			allowedHosts: true,
		},
	},
})
