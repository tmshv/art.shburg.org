import template from '../../templates/components/page-school.html';

export default function (app) {
    app.component('pageSchool', {
        template: template,
        controller: function() {
            this.pageClass = 'page-school';

            //let fotorama;
            //let $tape = $('.tape-block');
            //let $fotorama = $tape.find('.tape-block__content');
            //
            //$tape.addClass('simplified');
            //$fotorama.on('fotorama:ready', () => {
            //    $tape.removeClass('simplified');
            //    fotorama.setOptions({
            //        nav: 'dots',
            //        transition: 'crossfade',
            //        autoplay: '6000',
            //        arrows: 'false',
            //        width: '100%',
            //        fit: 'cover',
            //        loop: 'true'
            //    });
            //});
            //
            //fotorama = $fotorama.fotorama().data('fotorama');
            //setTimeout(() => {
            //    fotorama.load([
            //        {img: 'https://static.shburg.org/art/img/cat1.jpg'},
            //        {img: 'https://static.shburg.org/art/img/cat2.jpg'},
            //        {img: 'https://static.shburg.org/art/img/cat3.jpg'}
            //    ]);
            //}, 100);
        }
    });
};