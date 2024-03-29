const webpack = require('webpack');
const config = require('./config.json');
const path = require('path');
const fs = require('fs');

module.exports = {
  mode: 'none',
  target: 'node',
  devtool: false,
  entry: './src/index.tsx',

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
    filename: `${config.name}.plugin.js`,
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    compareBeforeEmit: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.css'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ ...process.env }),
    new webpack.BannerPlugin({
      raw: true,
      banner: (_) => {
        const upToDateConfig = fs.readFileSync('./config.json');
        const upToDateConfigJson = JSON.parse(upToDateConfig);

        const lines = ['/**'];
        for (const key in upToDateConfigJson) {
          lines.push(` * @${key} ${upToDateConfigJson[key]}`);
        }
        lines.push(' */');
        return lines.join('\n');
      },
    }),
    {
      apply: (compiler) => {
        compiler.hooks.assetEmitted.tap(config.name, (filename, info) => {
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
