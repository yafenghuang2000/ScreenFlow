import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

const env = loadEnv().rawPublicVars;

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  server: {
    port: 8000,
    host: '0.0.0.0',
    open: true,
    compress: true,
    strictPort: true,
    proxy: {
      [`${env.PUBLIC_BAS_API}`]: {
        target: `${env.PUBLIC_BAS_URL}`,
        changeOrigin: true,
        pathRewrite: {
          [`^${env.PUBLIC_BAS_API}`]: '',
        },
      },
    },
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
      'process.env.PUBLIC_BAS_URL': JSON.stringify(process.env.PUBLIC_BAS_URL),
      'process.env.PUBLIC_BAS_API': JSON.stringify(process.env.PUBLIC_BAS_API),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
