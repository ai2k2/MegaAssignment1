module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: '8' },
      /*
       * useBuiltIns configures how @babel/preset-env handles polyfills.
       * useBuiltIns: 'usage' - adds specific imports for polyfills when they are used in each file.
       * useBuiltIns: 'entry' - adds individual requires to different core-js entry points based on environment.
       * useBuiltIns: false - does not add polyfills automatically per file
       * 
       * Note:
       * This library (serverless-pg) does not currently require polyfills
       * but it may in th