import socketIO from 'socket.io';
import data from './data';

export default function(server) {
    let io = socketIO(server);
    io.on('connection', socket => {
        console.log('a user connected');

        socket.emit('feed', {
            type: 'test',
            id: 1,
            message: 'hello world'
        });

        // socket.on('my other event', function (data) {
        //     console.log(data);
        // });
    });

    data.feed.on('update', i => {
        console.log(`io feed update ${JSON.stringify(i, null, '\t')}`);
        io.emit('feed', i);
    });
}
