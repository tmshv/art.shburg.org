// import { MongoClient } from 'mongodb';
// const { connect, collection } = require('../../src/core/db')
// import {collection, connect} from '../core/db'
const core = require('../core/db')

// const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });

export const withCollection = handler => async (req, res) => {
    await core.connect()

    req.collection = core.collection

    // if (!client.isConnected()) {
    //     return client.connect().then(() => {
    //         req.db = client.db('nextjsmongodbapp');
    //         return handler(req, res);
    //     });
    // }
    // req.db = client.db('nextjsmongodbapp');
    return handler(req, res)
}
