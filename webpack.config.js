const path = require("path");

const baseConfig = {
	cache: false,
	mode: "development",
	devtool: "source-map",
	output: {
		ecmaVersion: 5,
		filename: "[name].js",
		path: path.resolve(__dirname, "build"),
		publicPath: "/",
		library: {type: "self"}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					compilerOptions: {
						preserveConstEnums: true
					}
				}
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	devServer: {
		contentBase: __dirname,
		compress: true,
		host: "0.0.0.0",
		port: 9000,
		publicPath: "/build/",
		useLocalIp: true,
		overlay: true
	}
};

module.exports = [
	{
		...baseConfig,
		entry: "./index.ts",
		output: {
			...baseConfig.output,
			filename: "index.js",
			library: {type: "commonjs-module"}
		}
	},
	{
		...baseConfig,
		entry: "./browser.ts",
		output: {
			...baseConfig.output,
			filename: "browser.js"
		}
	},
	{
		...baseConfig,
		entry: "./browser.polyfill.ts",
		output: {
			...baseConfig.output,
			filename: "browser.polyfill.js"
		}
	}
];
