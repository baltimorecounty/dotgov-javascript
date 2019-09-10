const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    SiteNavigation: "./src/site/HamburgerMenu.js",
    FollowUp: "./src/page-specific/BaltCoGo/FollowUp.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "assets/dotgov-[name].min.js".toLowerCase(),
    library: "Bc[name]"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
