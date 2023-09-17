const webpack = require('webpack');
const pkg = require('./package.json');
const pluginConfig = require('./config.json');
const path = require('path');
const fs = require('fs');

pluginConfig.version = pkg.version;

const meta = (() => {
  const lines = ['/**'];
  for (const key in pluginConfig) {
    lines.push(` * @${key} ${pluginConfig[key]}`);
  }
  lines.push(' */');
  return lines.join('\n');
})();

module.exports = {
  mode: 'development',
  target: 'node',
  devtool: false,
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          // { loader: "style-loader" },  // to inject the result into the DOM as a style block
          // { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          { loader: 'css-loader', options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
          // { loader: "sass-loader" },  // to convert SASS to CSS
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ],
      },
    ],
  },
  output: {
    filename: `${pluginConfig.name}.plugin.js`,
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    compareBeforeEmit: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.css'],
  },
  plugins: [
    new webpack.BannerPlugin({ raw: true, banner: meta }),
    {
      apply: (compiler) => {
        compiler.hooks.assetEmitted.tap(pluginConfig.name, (filename, info) => {
          const userConfig = (() => {
            if (process.platform === 'win32') return process.env.APPDATA;

            if (process.platform === 'darwin') {
              return path.join(
                process.env.HOME,
                'Library',
                'Application Support'
              );
            }

            if (process.env.XDG_CONFIG_HOME) return process.env.XDG_CONFIG_HOME;

            return path.join(process.env.HOME, '.config');
          })();

          const bdFolder = path.join(userConfig, 'BetterDiscord');

          fs.copyFileSync(
            info.targetPath,
            path.join(bdFolder, 'plugins', filename)
          );

          console.log(`\n\n✅ Copied to BD folder\n`);
        });
      },
    },
  ],
};
