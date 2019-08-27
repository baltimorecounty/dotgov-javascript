const path = require('path');

module.exports = {
	mode: 'production',
	entry: {},
	output: {
		path: path.join(__dirname, 'lib'),
		filename: '[name].min.js',
		library: 'Bc[name]'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			}
		]
	}
};
