// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prittier"],
  pluggins: ["prittier"],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["/dist/*"],
};
