module.exports = [
  {
    name: 'ui',
    type: 'list',
    message: '请选择UI库',
    choices: [
      {
        name: 'Element UI',
        value: 'element-ui'
      },
      {
        name: 'Vant',
        value: 'vant'
      }
    ],
    default: 'none'
  }
]