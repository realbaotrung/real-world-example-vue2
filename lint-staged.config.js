module.exports = {
  '*.{js,vue}': ['vue-cli-service lint'],
  'src/**/*.{js,vue}': ['prettier --write src/**/*.{js,json,vue} --config .prettierrc.js --ignore-path .prettierignore'],
};
