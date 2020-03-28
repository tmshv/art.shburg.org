module.exports = {
    exportTrailingSlash: true,
    env: {
        APP_ARTICLES_PAGE_SIZE: 24,
        APP_CARD_DEFAULT_IMAGE: 'https://art.shlisselburg.org/static/img/main.jpg',
    },
    webpack(config) {
        config.resolve.modules.push(__dirname)
        return config;
    },
}
