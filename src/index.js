import 'babel-polyfill'

import config, {name} from './config'
import {connect, collection} from './core/db'
import server from './server'

import DataManager from 'hudozka-data'

function main() {
	async function loop() {
		const dbUri = config.db.uri
		await connect(dbUri)

		try {
			let data = new DataManager({
				timeline: collection('timeline'),
				schedules: collection('schedules'),
				documents: collection('documents'),
			})

			let app = server(data)

			app.listen(config.port)
		} catch (e) {
			console.error(e.stack)
			return
		}

		console.log(`Using node ${process.version}`)
		console.log(`App ${name} started`)
		console.log(`Listening ${config.port}`)
		console.log(`DB Address ${dbUri}`)
	}

	return loop()
}

main()
