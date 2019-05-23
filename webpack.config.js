const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const env = process.env.NODE_ENV || "local";
const analyze = process.env.ANALYZE_BUNDLE;

const plugins = [];

if(analyze) {
	plugins.push(new BundleAnalyzerPlugin());
}
if(env != "local") {
	plugins.push(new CompressionPlugin());
}

// 404, 237, 83
// 396, 312
module.exports = {
	entry: {
		app: [
			path.resolve(__dirname, "src/app/index.js")
		]
	},
	mode: env == "local" ? "development" : "production",
	output: {
		path: path.resolve(__dirname, "public/build"),
		filename: "[name].bundle.js",
		chunkFilename: "[name].chunk.js",
		publicPath: "/build/"
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader"
				} 
			}
		]
	},
	plugins,
	optimization: { 
		minimizer: [
			new TerserPlugin()
		] 
	},
	watch: env == "local",
	resolve: {
		extensions: ['.js', '.jsx']
	}
};