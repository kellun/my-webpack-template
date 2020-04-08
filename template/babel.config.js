module.exports = {
  presets: ['@vue/app'],
  <%_ if (options.ui === 'vant') { _%>
  plugins: [
    [
      'import',
      { libraryName: 'vant', libraryDirectory: 'es', style: true },
      'vant'
    ]
  ]
  <%_ } _%>
};
