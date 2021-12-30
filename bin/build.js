const webpack = require('webpack');
const config = require('../build/webpack.prod.conf.js');

const compiler = webpack(config);

compiler.run((err, stats) => {
    if (err) {
        console.error(err);
        // console.error(chalk.red(err.stack || err));
        // if (err.details) {
        //     console.log(chalk.red(err.details));
        // }
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
        console.log('Build complete')
        // console.log(chalk.cyan('  Build complete.\n'));
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
});