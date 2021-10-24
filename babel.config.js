module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant", //自动按需引入vant组件
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
