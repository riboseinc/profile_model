const context = require.context("./resolvers", false, /\.js$/);

const resolvers = {};

context.keys().forEach(file => {
  let module = file.match(/([^\/]+)\.js$/)[1];
  resolvers[module] = context(file).default;
});

export default resolvers;