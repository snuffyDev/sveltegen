#!/usr/bin/env node

import { fn } from './functions'
import './cli'

async function main() {
	const config = fn().hasConfig()
	let _conf
	if (!config) {
		_conf = fn()
			.createConfig()
			.then(data => data)
	}
}
main()
