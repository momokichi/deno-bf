import { Command } from "https://deno.land/x/cliffy@v0.19.6/command/mod.ts";
import { exec, repl } from "./bf.ts";

const { options, args } = await new Command()
  .name("brainfxxk")
  .version("0.1.0")
  .description("Command line arguments parser")
  .option("-f, --file", "read from file.")
  .arguments("[arg]")
  .parse(Deno.args);

const { file } = options;

if (file) exec(args[0]);
else repl();
