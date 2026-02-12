module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/valentine/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false
}
