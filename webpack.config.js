const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    Accordion: "./src/components/Accordion.js",
    FollowUp: "./src/page-specific/BaltCoGo/FollowUp.js",
    StepList: "./src/components/StepList.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: chunkData => {
      const {
        chunk: { name }
      } = chunkData;
      return `assets/dotgov-${name.toLowerCase()}.min.js`;
    },
    library: "Bc[name]"
  },
  devServer: {
    contentBase: "./dist",
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(@baltimorecounty\/javascript-utilities)\/).*/,
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
