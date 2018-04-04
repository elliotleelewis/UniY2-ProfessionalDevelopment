/* eslint-disable import/no-extraneous-dependencies */

const mix = require('laravel-mix'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

// Config
if (!mix.inProduction()) {
	mix.sourceMaps();
}
mix.setPublicPath('public');
mix.webpackConfig({
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
});

// Autoload & Vendor Extraction
mix.autoload({
	jquery: ['$', 'jQuery', 'window.jQuery'],
	'popper.js/dist/umd/popper.js': ['Popper'],
});
mix.extract([
	'jquery',
	'popper.js/dist/umd/popper.js',
	'react',
	'react-dom',
	'react-hammerjs',
	'react-slider',
]);

// Compile
mix.js('src/css/index.scss', 'public/dist/css');
mix.react('src/js/index.jsx', 'public/dist/js');
