const fs = require("fs");
const path = require("path");

const componentsPath = path.resolve(__dirname, "./components");

const componentsDirs = fs
  .readdirSync(componentsPath)
  .filter((item) => !item.includes("."));

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [
      0,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "header-max-length": [0, "always", 120],
    "scope-enum": [2, "always", [...componentsDirs, "website"]],
  },
};
