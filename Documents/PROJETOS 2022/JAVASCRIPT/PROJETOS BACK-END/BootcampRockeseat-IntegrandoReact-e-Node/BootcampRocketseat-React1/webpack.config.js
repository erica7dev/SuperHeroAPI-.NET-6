const path = require("path");

//primeiro arq. que será carregado
module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    //onde arq. será recebido
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/, //string tem que terminar com JS
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", //tô dizendo p/ converter
        },
      },
      {
        test: /.\css$/,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/,
        use: {
          loader: "file-loader"
        }
      }
    ],
  },
};
