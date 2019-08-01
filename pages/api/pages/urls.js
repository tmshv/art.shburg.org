import { connect } from '../../../src/core/db'
import Page from '../../../src/core/Page'

export default async (req, res) => {
    await connect()

    const data = await Page.find({})
    if (data) {
        const items = data.map(x => x.url)

        res.json({
            items,
        })
    } else {
        res.status(404)
        res.json({
            error: `Not found`
        })
    }
}
