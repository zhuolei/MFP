// const { injectBabelPlugin } = require('react-app-rewired');

// module.exports = function override(config, env) {
//     config = injectBabelPlugin(
//         ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
//         config,
//     );
//     config = rewireLess.withLoaderOptions({
//                 modifyVars: { "@primary-color": "#1DA57A" },
//                 javascriptEnabled: true,
//              })(config, env);
//     return config;
// };

const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {

    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true,
                }),
            ],
        })
    };
    config = injectBabelPlugin(
                ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'ant'],
                config,
            );
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        // modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env);

    return config;

};