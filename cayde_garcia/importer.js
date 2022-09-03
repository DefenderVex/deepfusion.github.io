import { readdirSync } from "fs";
var files = readdirSync(window.location.href + "/polaroids/");

console.table(files);