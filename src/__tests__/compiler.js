const path = require('path');
const webpack = require('webpack');

module.exports = (classNamesOtions = {}, moduleOptions = {}) => {
    const compiler = webpack({
        devtool: false,
        mode: 'development',
        context: __dirname,
        entry: './fixtures/test.css',
        output: {
            path: path.join(__dirname, 'output'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: require.resolve('../index'),
                            options: classNamesOtions,
                        },
                        {
                            loader: 'style-loader',
                            options: {
                                modules: moduleOptions,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: moduleOptions,
                            },
                        },
                    ],
                },
            ],
        },
    });

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            }

            const result = stats.toJson();

            if (stats.hasErrors()) {
                reject(new Error(result.errors));
            }

            resolve(result);
        });
    });
};
