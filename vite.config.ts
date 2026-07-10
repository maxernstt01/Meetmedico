import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// vitest resolves its own (newer) internal Vite, and vite-plugin-svgr's SVG-to-JSX
// transform crashes under it ("transformWithOxc is not a function"). This stub
// intercepts `*.svg?react` imports before vite-plugin-svgr sees them, but only when
// running under vitest — the real dev server / build still use vite-plugin-svgr as-is.
function svgrTestStub(): Plugin {
  return {
    name: 'svgr-test-stub',
    enforce: 'pre',
    resolveId(id) {
      return id.endsWith('.svg?react') ? `\0${id}` : null;
    },
    load(id) {
      if (!id.startsWith('\0') || !id.endsWith('.svg?react')) return null;
      return [
        "import { createElement, forwardRef } from 'react';",
        'export default forwardRef(function SvgIconMock(props, ref) {',
        "  return createElement('svg', { ref, 'data-testid': 'svg-icon-mock', ...props });",
        '});',
      ].join('\n');
    },
  };
}

export default defineConfig({
  plugins: [react(), svgr(), ...(process.env.VITEST ? [svgrTestStub()] : [])],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
