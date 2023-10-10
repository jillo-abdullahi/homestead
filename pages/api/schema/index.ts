import "./types";
import "./queries";
import "./mutations";
import builder from "./builder";
export const schema = builder.toSchema();
