const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCss(withSass({
    exportTrailingSlash: true,
    env: {
        APP_ARTICLES_PAGE_SIZE: 15,
    },
    webpack(config) {
        config.resolve.modules.push(__dirname)
        return config;
    },
}))
