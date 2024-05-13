const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader', // Inject CSS into the DOM
        'css-loader', // Translate CSS into CommonJS
        'sass-loader', // Compile Sass/SCSS to CSS
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/public/'),
        to: path.resolve(__dirname, 'dist/'),
        globOptions: {
          ignore: ['**/images/**'],
        },
      }],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({
            url,
          }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurantdb-api',
          },
        },
        {
          urlPattern: ({
            url,
          }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurantdb-api-detail',
          },
        },
        {
          urlPattern: ({
            url,
          }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-image-api',
          },
        },
        {
          urlPattern: ({
            url,
          }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-image-api',
          },
        },
        {
          urlPattern: ({
            url,
          }) => url.href.startsWith('https://use.fontawesome.com/b070c8f1df.css'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'fontawesome-bundle',
          },
        },
        {
          urlPattern: ({
            url,
          }) => url.href.startsWith('https://use.fontawesome.com/b070c8f1df.js'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'fontawesome-bundle',
          },
        },
      ],
    }),

    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),

    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 50,
        },
      }],
      overrideExtension: true,
    }),
    new BundleAnalyzerPlugin(),
  ],
};
