// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = process.env.REPO_NAME ?? 'SmartFlow.website'
const isPages = process.env.GITHUB_PAGES === 'true'
const isUserOrgPage = repo.endsWith('.github.io')

export default defineConfig({
    plugins: [react()],
    // Pour une Repo Page: base = "/SmartFlow.website/" quand on build via Actions
    base: isPages ? (isUserOrgPage ? '/' : `/${repo}/`) : '/',
})
