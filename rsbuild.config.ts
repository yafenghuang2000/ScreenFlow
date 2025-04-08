import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  server: {
    port: 8000,
    host: '0.0.0.0',
    open: true,
    compress: true,
    strictPort: true,
  },
  dev: {},
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        react: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        vendor: /[\\/]node_modules[\\/]/,
      },
      override: {
        chunks: 'all',
        minSize: 300 * 1024,
        maxSize: 800 * 1024,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  source: {
    define: {
      // 定义全局变量
      __APP_TITLE__: 'My Custom Title',
      __APP_DESCRIPTION__: 'This is a custom description.',
    },
    entry: {
      index: './src/index.tsx',
    },
  },
  output: {
    distPath: {
      root: './dist',
      html: './',
      css: 'css',
      cssAsync: 'css',
      js: './js',
      jsAsync: './js',
      svg: 'assets',
      font: 'assets',
      image: 'assets',
      media: 'assets',
    },
    filename: {
      js: (pathData) => {
        if (pathData.chunk?.name === 'index') {
          return '../bundle.js';
        }
        if (pathData.chunk?.name === 'react') {
          return 'react.js';
        }
        return '[contenthash:8].js';
      },
    },
    injectStyles: true,
  },
});
