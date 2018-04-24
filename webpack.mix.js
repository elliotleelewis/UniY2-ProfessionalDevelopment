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
			hash: true,
		}),
	],
});

// Autoload & Vendor Extraction
mix.autoload({
	jquery: ['$', 'jQuery', 'window.jQuery'],
	'popper.js/dist/umd/popper.js': ['Popper'],
});
mix.extract([
	'bootstrap',
	'jquery',
	'popper.js/dist/umd/popper.js',
	'prop-types',
	'query-string',
	'react',
	'react-dom',
	'react-hammerjs',
	'react-redux',
	'react-router-dom',
	'react-slider',
	'redux',
]);

// Compile
mix.js('src/css/index.scss', 'public/dist/css');
mix.react('src/js/index.jsx', 'public/dist/js');
