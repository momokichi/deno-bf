import { BufReader } from "https://deno.land/std/io/mod.ts";

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

export const bf = (code: string): string => {
  let p = 0, i = 0;
  const memSize = 10;
  const mem: number[] = Array(memSize).fill(0);
  let decode = "";


  while(i < code.length) {
    const c = code[i]
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
          let depth = 1;
          while (depth > 0) {
            i++;
            if (code[i] == Token.LoopStart) depth++;
            if (code[i] == Token.LoopEnd) depth--;
          }
        }
        break;
      case Token.LoopEnd:
        if (mem[p] != 0) {
          let depth = 1
          while(depth > 0){
            i--;
            if(code[i] == Token.LoopEnd) depth++;
            if(code[i] == Token.LoopStart) depth--;
          }
        }        
        break;
      case Token.Input:
        // mem[p] = await getChar();
        break;
      case Token.Output:
        decode += String.fromCodePoint(mem[p]);
        break;
      default:
        // comment
        break;
    }
    i++;
    // printMem(mem)
  }
  console.log(decode)
  return decode;
};


const printMem = <T> (mem: T[]) => {
  let buf  = ""
  for(const c of mem){
    buf+= `[${c}]`
  }
  console.log(buf)
}

const getChar = async () => {
  const reader = new BufReader(Deno.stdin);
  const readLineResult = await reader.readLine();
  if (readLineResult == null) throw Error();
  const input = new TextDecoder().decode(readLineResult.line);
  const char = input[0];
  return char.charCodeAt(0);
};
