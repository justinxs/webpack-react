const path = require('path');
const webpack = require('webpack');
const config = require('../build/webpack.prod.conf.js');
const rm = require('rimraf');
const loadESMoudle = require('./loadESMoudle');

const compiler = webpack(config);

rm.sync(path.resolve(__dirname, '../dist'));

loadESMoudle(['ora', 'chalk']).then(([ora, chalk]) => {
    const spinner = ora('building...').start();

    compiler.run((err, stats) => {
        spinner.stop();
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