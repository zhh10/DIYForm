const { merge } = require('lodash')
const path = require('path')
const { config } = require('process')
module.exports = {
  configureWebpack:{
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'src')
        }
    }
},
}