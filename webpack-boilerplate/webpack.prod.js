const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(commonConfig, {
  // 빌드 파일을 분석하기 위해서 development 모드
  mode: 'development',
  // inline-source-map으로 안하면 eval로 뭉쳐놔서 분석이 안됨
  devtool: 'inline-source-map',
})
