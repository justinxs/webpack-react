const path = require('path');
const webpack = require('webpack');
const nodemon = require('nodemon');
const rm = require('rimraf');
const config = require('../build/webpack.dev.conf.js');
const serverSettings = require('../config/server.json');
const loadESMoudle = require('./loadESMoudle');


const compiler = webpack(config);
let serverStart = false;

rm.sync(path.resolve(__dirname, '../dist'));


loadESMoudle(['ora', 'chalk']).then(([ora, chalk]) => {
    const spinner = ora('building...').start();

    compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        spinner.stop();
        
        if (!serverStart) {
            nodemon(`-e js,json,html --watch server --watch config --ignore node_modules/**node_modules --inspect=${serverSettings.inspectPort} ./server/main.js`);
            serverStart = true;
        }
        if (err) {
            console.error(chalk.red(err.stack || err));
            if (err.details) {
                console.log(chalk.red(err.details));
            }
        } else {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false,
                cachedAssets: false,
                entrypoints: false
            }) + '\n\n');

            console.log(chalk.cyan('  Build complete.\n'));
        }
    
        const info = stats.toJson();
    
        if (stats.hasErrors()) {
            console.error(info.errors);
        }
    
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
    });
});

nodemon.on('start', function() {
	console.log('App has started');
}).on('quit', function() {
	console.log('App has quit');
	process.exit();
}).on('restart', function(files) {
	console.log('App restarted due to: ', files);
});