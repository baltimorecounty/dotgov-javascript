const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    Accordion: "./src/components/Accordion.js",
    FollowUp: "./src/page-specific/BaltCoGo/FollowUp.js",
    Modal: "./src/components/Modal.js",
    StepList: "./src/components/StepList.js",
    Site: "./src/site/Site.js",
    SiteNavigation: "./src/site/SiteNavigation.js",
    LoopNavigation: "./src/page-specific/Loop/loop-menu.js",
    SubpageTabs: "./src/template/SubpageTabs.js",
    EventFilter: "./src/components/EventFilter.js",
    ScrollToTop: "./src/components/ScrollToTop.js",
    PhoneDirectory: "./src/site/PhoneDirectory.js",
    ResponsiveTable: "./src/components/ResponsiveTable.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: (chunkData) => {
      const {
        chunk: { name },
      } = chunkData;
      return `assets/dotgov-${name.toLowerCase()}.min.js`;
    },
    library: "Bc[name]",
  },
  devServer: {
    contentBase: "./dist",
    publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude:
          /node_modules\/(?!(@baltimorecounty\/javascript-utilities)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
