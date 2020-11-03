const path = require('path') 
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    lintOnSave:false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@api', resolve('src/api'))
            .set('@',resolve('src'))
        //不编译 iView Pro
        config.module
            .rule('js')
            .test(/\.jsx?$/)
            .exclude
            .add(resolve('src/libs/iview-pro'))
            .end()
        config.module
        .rule('js')
        .test(/\.jsx?$/)            
        .exclude
        .add(resolve('src/libs/iRegion'))
        .end()
    }
}