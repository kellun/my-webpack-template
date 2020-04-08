module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
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
