import "./types/index.js";
import "./queries/index.js";
import "./mutations/index.js";
import builder from "./builder/builder.js";
export const schema = builder.toSchema();
