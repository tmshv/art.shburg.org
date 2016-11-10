import template from '../../templates/components/timeline.html';

import {createInstance as createInstagram} from '../../models/TimelinePostInstagram';

// function personByInstagram(list, instagram){
//     list = list.filter(function (member) {
//         try {
//             return member.contacts.instagram === instagram;
//         } catch (error) {
//             return false;
//         }
//     });
//
//     if(list.length){
//         return list[0].id;
//     }else{
//         return null;
//     }
// }

// function postText(post){
//     try{
//         return post.data.caption.text.replace(/#[\w_]+/, '')
//     }catch(error){
//         return "";
//     }
// }

// function toInstagram(post){
//     //var author_id = personByInstagram(team.team, post.data.author);
//     //var name = author_id ? team.short(author_id) : post.data.author;
//     let name = 'hudozka';
//
//     return {
//         date: post.date,
//         image: post.data.image.standard_resolution.url,
//         url: post.data.url,
//         username: name,
//         userpic: 'https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-19/11357496_464997000344800_2124591831_a.jpg',
//         text: post.body,
//         //text: postText(post),
//         type: post.type
//     };
// }

const createPost = post => post.type === 'post' ? post : null;
const createPosts = items => items
    .map(createRecord)
    .filter(Boolean);

function createRecord(post){
    for (let fn of [createInstagram, createPost]){
        let result = fn(post);
        if(result) return result;
    }
    return null;
}

export default function (app) {
    app.component('timeline', {
        template: template,
        controller: function ($timeout, usSpinnerService, api, io) {
            let skip = 0;
            let limit = 10;
            this.feed = [];

            this.timelineUpdating = false;
            usSpinnerService.stop('timelineMore');

            this.loadNext = () => {
                this.timelineUpdating = true;
                usSpinnerService.spin('timelineMore');

                api.timeline.feed(limit, skip)
                    .then(i => i.data)
                    .then(feed => {
                        this.timelineUpdating = false;
                        usSpinnerService.stop('timelineMore');

                        // let feed2 = feed.map(post => {
                        //     if (post.type == 'instagram') return toInstagram(post);
                        //     else return post;
                        // });
                        feed = createPosts(feed);

                        skip += limit;
                        this.feed = this.feed.concat(feed);
                        this.showFooter = this.feed && this.feed.length;
                    });
            };

            this.loadNext();

            io.on('feed', feed => {
                console.log(feed);
                feed = createPosts(feed instanceof Array ? feed : [feed]);

                $timeout(()=> {
                    this.feed = feed.concat(this.feed);
                }, 0);
            });
        }
    });
};
