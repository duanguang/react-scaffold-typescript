const { createTransformer,createTransformerReactJsxProps } = require('ts-plugin-legions');
var packageConfig = require('./package.json');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const chalk = require('chalk');
const  path = require('path');
module.exports = function (configs) {
    configs = Object.assign({}, configs, {
        name: packageConfig.name,
        defaultPort: 8002,
        projectType: 'ts',
        publicPath: '/app/',
        isTslint: true,
        //server:'172.16.15.50',
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
        apps: ['home'],
        entries: ['src/home/index'],
        webpack: {
            dllConfig: {
                vendors: [ 'react',
                'mobx',
                'mobx-react',
                'superagent',
                'react-router-dom',
                'react-dom',
                'classnames',
                'isomorphic-fetch',
                'history',
                'invariant',
                'warning',
                'hoist-non-react-statics',
                'sortablejs',
                'xlsx',
                "dexie",
                "html2canvas",
                "clipboard",
                "jsbarcode"]
            },
            tsCompilePlugin: {
                option: {
                    getCustomTransformers:() => ({ before: [createTransformer(),createTransformerReactJsxProps({
                        components: [{ name: 'HLTable',props: 'uniqueUid',value: '' },
                        { name: 'HLFormContainer',props: 'uniqueUid' },
                        { name: 'QueryConditions',props: 'uniqueUid' }]
                    })] })
                },
            },
            disableReactHotLoader: false,
            cssModules: {
                enable: true, // 默认false
            },
            plugins: [
                new ProgressBarPlugin({
                    summary: false,
                    format: `${chalk.green.bold('build [:bar]')}` + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                    summaryContent: '',
                }),
                new webpack.NamedChunksPlugin(),
            ],
            extend: (loaders, { isDev, loaderType, projectType,transform }) => {
                if (loaderType === 'HotLoader' && isDev) {
                    loaders.push({
                        test: /\.(jsx|js)?$/,
                        loader: 'react-hot-loader!babel-loader',
                        include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                    });
                }
                if (loaderType === 'JsLoader') {
                    loaders.push({
                        test: /\.(jsx|js)?$/,
                        include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                        loader: 'happypack/loader?id=js',
                    });
                }
                if (loaderType === 'TsLoader' && projectType === 'ts') {
                    loaders.push({
                        test: /\.(ts|tsx)$/,
                        include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                        loader: 'happypack/loader?id=ts',
                    });
                }
                // transform = {
                //     cssModule: CSS_MODULE_OPTION, // 内部css modules 默认值
                //     LoaderOptions: postcss_loader, // 内部默认加载器参数
                //     execution: generateLoaders // 内部通用生成loader use 值函数
                // }
                if (loaderType === 'StyleLoader' && transform) {
                    const newLoaders = [
                        {
                            test: new RegExp(`^(?!.*\\.modules).*\\.css`),
                            use: transform.execution(null, null, transform.LoaderOptions),
                            include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                        },
                        {
                            test: new RegExp(`^(.*\\.modules).*\\.css`),
                            use: transform.execution(transform.cssModule, null, transform.LoaderOptions),
                            include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                        },
                        {
                            test: new RegExp(`^(?!.*\\.modules).*\\.less`),
                            use: transform.execution(null, 'less-loader', transform.LoaderOptions),
                            include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                        },
                        {
                            test: new RegExp(`^(.*\\.modules).*\\.less`),
                            use: transform.execution(transform.cssModule, 'less-loader', transform.LoaderOptions),
                            include: [path.join(process.cwd(), 'node_modules/hoolinks-legion-design')],
                        },
                    ];
                    loaders.push(...newLoaders);
                }
            },
            /* commonsChunkPlugin:['react','mobx-react','mobx','babel-polyfill','superagent',
                'react-router-dom','classnames','isomorphic-fetch',
                 'react-dom','history','invariant','warning','hoist-non-react-statics'], */
        },
        htmlWebpackPlugin: {
            title: "webApp"/*O2O订单管理系统*/,
        },
        "postcss": {
            "autoprefixer": {
                "browsers": ['last 2 version', 'safari 5', 'ios 6', 'android 4']
            }
        },
        babel: {
            query: {
                presets: [
                    "es2015",
                    "stage-2",
                    "react"
                ],
                cacheDirectory: '.webpack_cache',
                plugins:  [
                    "add-module-exports",
                    "transform-runtime",
                    "transform-decorators-legacy",
                    [
                        "import",
                        [
                            {libraryName: "antd", style: true}
                        ]
                    ]
                ]
            }
        }
    });
    return configs;
};
/*module.exports = {
    "name":"default",
    "apps":['home'],
    "open": false,
    "defaultPort": 8002,
    "server": "127.0.0.1",
    "imageInLineSize": 8192,
    "publicPath": "/assets/",
    "devServer": {
        "noInfo": true,
        "proxy": undefined
         //proxy: [{
         //context: ['/**', '!/static/**', '!/webpack/**', '!/webpack-dev-server/**', '!/sockjs-node/**', '!/index.html'],
         //target: 'http://tstmanage.360kad.com
         //',
         //changeOrigin: true
         //}]
    },
    "postcss": {
        "autoprefixer": {
            "browsers": [
                "last 2 versions",
                "Firefox ESR",
                "> 1%",
                "ie >= 8"
            ]
        }
    },
    "webpack": {
        "dllConfig": {
            "vendors": ['react']
        }
    },
    "babel": {
        "query": {
            "presets": [
                "es2015",
                "stage-0",
                "react"
            ],
            "cacheDirectory": true,
             "plugins": [
            "add-module-exports",
            "transform-runtime",
            "transform-decorators-legacy",
        ]
        }
    },
    "htmlWebpackPlugin": {
        "title": "",
        "appMountId": "",
    },
    "entries": ['src/index']
};*/

