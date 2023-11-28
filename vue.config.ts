module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    entry: '/app/src/main.ts',
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
  },
  compilerOptions: {
    allowJs: true,
    isCustomElement: (tag) => tag.startsWith('v-'),
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles.scss";`,
      },
    },
  },
  pages: {
   index: {
     entry: '/app/src/main.ts'
    }
  },
};
