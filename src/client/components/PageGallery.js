import template from '../../templates/components/page-gallery.html';

export default function (app) {
    app.component('pageGallery', {
        template: template,
        controller: function (api) {
            this.pageClass = 'page-gallery';

            this.years = [];
            [2015, 2014, 2013, 2012, 2011, 2010]
                .forEach((year, year_index) => {
                    api.gallery.year(year)
                        .success(albums => {
                            if (albums.length) {
                                this.years[year_index] = {
                                    year: year,
                                    albums: albums.map(album => {
                                        let preview = album.content[0];
                                        album.preview_url = preview.content.medium.url;
                                        return album;
                                    })
                                };
                            }
                        })
                });
        }
    });
};