const { createTransformer,createTransformerReactJsxProps } = require('ts-plugin-legions');
// const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
var packageConfig = require('./package.json');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const path = require('path');
const resolve = dir => path.resolve(__dirname,dir);
/** @type {import('./node_modules/brain-cli').eConfig} */
module.exports = function (configs) {
    let vendors = [
        /* 'react',*/
        'mobx',
        'mobx-react',
        'superagent',
        'classnames',
        // 'isomorphic-fetch',
        'history',
        'invariant',
        'warning',
        'hoist-non-react-statics',
        'sortablejs',
    ]

    const {
        npm_lifecycle_script,
        npm_config_argv
    } = process.env;
    const original = JSON.parse(npm_config_argv).original
    let cdn = original.find((item) => item.indexOf('cdn') > -1) || '';
    !cdn && (cdn = npm_lifecycle_script.split('--').find((item) => item.indexOf('cdn') > -1) || '')
    let __cdn = cdn ? cdn.match(/cdn=(.*)/)[1] : '';
    let _vendors = process.env.NODE_ENV === 'dev' ? vendors : {
        value: vendors,
        externalUrl: __cdn
    }
    /** @type {import('./node_modules/brain-cli').config} */
    let config = {
        name: packageConfig.name,
        defaultPort: 8002,
        publicPath: '/app/',
        isTslint: true,
        // server:'192.168.100.173',
        devServer: Object.assign({},
            configs.devServer,
            {
                // proxy: {
                // '/v1/oss/uploadByForm': {
                //     target: 'https://qa-fc.hoolinks.com',
                //     secure: false,
                //     onProxyReq: (proxyReq, req, res) => {
                //         proxyReq.setHeader('host', 'qa-fc.hoolinks.com');
                //     },
                // },
                // }
            }),
        apps: ['main'],
        entries: ['src/main/index'],
        webpack: {
            resolve: {
                alias: {
                    '@': resolve('src'),
                    '@main': resolve('src/main'),
                }
            },
            css: {
                loader_include: [/antd\-mobile/]
            },
            output: {
                library: `${packageConfig.name}-[name]`,
                libraryTarget: 'window',
            },
            dllConfig: {
                compileOptions: {
                    output: {
                        libraryTarget: 'window',
                    },
                },
                vendors: _vendors,
            },
            tsCompilePlugin: {
                option: {
                    getCustomTransformers: () => ({
                        before: [createTransformer([{
                            libraryName: 'legions/store',
                            bindings: ['StoreModules'],
                        },]
                        ),createTransformerReactJsxProps({
                            components: []
                        })]
                    })
                },
            },
            disableReactHotLoader: false,
            plugins: [
                new ProgressBarPlugin({
                    summary: false,
                    format: `${chalk.green.bold('build [:bar]')}` + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                    summaryContent: '',
                }),
                // new webpack.NamedChunksPlugin(),
                // new FilterWarningsPlugin({
                //     exclude: /export .* was not found in/,
                // })
            ],
        },
        htmlWebpackPlugin: {
            title: "webApp",
        },
        postcss: {
            autoprefixer: {
                browsers: [
                    'last 2 version',
                    'safari 5',
                    'ios 6',
                    'android 4',
                    'ie >= 10',
                ],
            },
            px2rem: {
                rootValue: 75,
                exclude:[/antd\-mobile/]
            }
        },
        babel: {
            query: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            /*  targets: {
                               esmodules: true,
                             }, */
                            "useBuiltIns": "entry", // entry usage  entry模式兼容IE11
                            "corejs": "2",
                            "targets": {
                                "browsers": [ // 浏览器
                                    "last 2 versions",
                                    "ie >= 10"
                                ],
                            },
                        }
                    ],
                    /*  "@babel/preset-env", */
                    "@babel/preset-react"],
                cacheDirectory: '.webpack_cache',
                plugins: [
                    'add-module-exports',
                    '@babel/plugin-transform-runtime',
                    ["@babel/plugin-proposal-decorators",{ "legacy": true }],
                    ['import',{
                        libraryName: 'antd-mobile',
                        "libraryDirectory": "es/components",
                        style: false
                    }],

                ]
            },
            loader_include: []
        }
    }
    return  Object.assign({}, configs,
        config);
};


