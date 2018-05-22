import {dbUri, port, name} from './config'
import {connect} from './core/db'
import server from './server'

function main() {
	async function loop() {
		try {
			await connect(dbUri)
		} catch (e) {
			console.error(e.message)

			process.exit(1)
		}

		const Config = require('./core/Config')
		const config = await Config.findConfig()

		try {
			let app = server(config)

			app.listen(port)
		} catch (e) {
			console.error(e.stack)
			return
		}

		console.log(`Using node ${process.version}`)
		console.log(`App ${name} started`)
		console.log(`Server: ${config.server}`)
		console.log(`DB Address: ${dbUri}`)
		console.log(`Listening ${port}`)
	}

	return loop()
}

main()
