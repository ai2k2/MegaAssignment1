module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: '8' },
      /*
       * useBuiltIns configures how @babel/preset-env handles p