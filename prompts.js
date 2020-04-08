module.exports = [
  {
    name: "ui", // 这个问题得到答案后，答案储存给那个字段，就是你要用的变量名称，key
    type: "checkbox", // 问题类型 单选 多选 输入。。。。。
    message: "请选择插件库", // 问题内容 给用户显示的问题
    choices: [
      {
        name: "Element UI", // 用户看的选项
        value: "element-ui", // 这个选项的value
        checked: true,
      },
      {
        name: "Vant",
        value: "vant",
      },
    ],
  },
];
