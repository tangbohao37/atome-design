import fs from "fs";
import path from "path";

const componentsPath = path.resolve(__dirname, "./components");

const componentsDirs = fs
  .readdirSync(componentsPath)
  .filter((item) => !item.includes("."));

console.log("componentsDirs", componentsDirs);
console.log("commit", commit);

export default {
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
