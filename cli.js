#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const ora = require('ora');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();
const url = 'http://whatthecommit.com/index.txt';
const arg = process.argv[2];

if (arg === '-h' || arg === '--help') {
	console.log(`
 Usage: wtf

 Your commit is writing checks your merge can't cash.
 `);
	process.exit(1);
}

dns.lookup('whatthecommit.com', err => {
	if (err) {
		logUpdate(`\n› No fucking internet connection!\n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = 'What the actual fuck?';
		spinner.start();
	}
});

got(url).then(res => {
	logUpdate(`\n›› ${res.body}`);
	spinner.stop();
}).catch(err => {
	if (err) {
		logUpdate(`\n› Motherfuck! \n`);
		process.exit(1);
	}
});
