const Token = {
  Increment: "+",
  Decrement: "-",
  Right: ">",
  Left: "<",
  LoopStart: "[",
  LoopEnd: "]",
  Input: ",",
  Output: ".",
} as const;

type Token = typeof Token[keyof typeof Token];

const memSize = 1024;

export const bf = (code: string, print = false): string => {
  let p = 0, i = 0, maxPointer = 0;
  const mem: number[] = Array(memSize).fill(0);
  let decode = "";

  while (i < code.length) {
    const c = code[i];
    switch (c) {
      case Token.Increment:
        mem[p]++;
        break;
      case Token.Decrement:
        mem[p]--;
        break;
      case Token.Right:
        p++;
        break;
      case Token.Left:
        p--;
        break;
      case Token.LoopStart:
        if (mem[p] == 0) {
          let count = 1;
          while (count > 0) {
            i++;
            if (code[i] == Token.LoopStart) count++;
            if (code[i] == Token.LoopEnd) count--;
          }
        }
        break;
      case Token.LoopEnd:
        if (mem[p] != 0) {
          let count = 1;
          while (count > 0) {
            i--;
            if (code[i] == Token.LoopEnd) count++;
            if (code[i] == Token.LoopStart) count--;
          }
        }
        break;
      case Token.Input:
        // to be implemented
        break;
      case Token.Output:
        decode += String.fromCodePoint(mem[p]);
        break;
      default:
        // ignore as a comment
        break;
    }
    i++;
    maxPointer = Math.max(maxPointer, p);
  }
  if (print) printMem(mem.slice(0, maxPointer + 1));
  return decode;
};

export const repl = async (print: boolean) => {
  const prompt = "🧠 ";
  console.log("Brainfxxk repl.");

  while (true) {
    const buf = new Uint8Array(memSize);
    await Deno.stdout.write(new TextEncoder().encode(prompt));
    const n = await Deno.stdin.read(buf);
    const line = new TextDecoder().decode(buf.subarray(0, n as number));
    console.log(bf(line, print));
  }
};

export const exec = async (fileName: string, print: boolean) => {
  const file = await Deno.open(fileName);
  const buf = new Uint8Array(memSize);
  // deno-lint-ignore no-unused-vars
  const n = await Deno.read(file.rid, buf);
  const input = new TextDecoder().decode(buf);
  console.log(bf(input, print));
};

const printMem = <T>(mem: T[]): void => {
  let buf = "";
  for (const c of mem) {
    buf += `[${c}]`;
  }
  console.log(`mem state: ${buf}`);
};
