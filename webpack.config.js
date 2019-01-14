"use strict";
const path = require("path");

module.exports = {
	cache:     false,
	mode:      "development",
	devtool:   "source-map",
	entry:     {
		browser:            "./browser.ts",
		"browser.polyfill": "./browser.polyfill.ts"
	},
	output:    {
		filename:   "[name].js",
		path:       path.resolve(__dirname, "build"),
		publicPath: "/"
	},
	module:    {
		rules: [
			{
				test:    /\.ts$/,
				loader:  "ts-loader",
				options: {
					compilerOptions: {
						preserveConstEnums: true
					}
				}
			}
		]
	},
	resolve:   {
		extensions: [".ts", ".js"]
	},
	devServer: {
		contentBase: __dirname,
		compress:    true,
		host:        "0.0.0.0",
		port:        9000,
		publicPath:  "/build/",
		useLocalIp:  true,
		overlay:     true
	}
};
