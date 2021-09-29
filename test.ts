import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";

import { bf } from "./bf.ts";

Deno.test("test", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test("Hello World! #1", async () => {
  const actual = await bf(
    ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]>++++++++[<++++>-]<.>+++++++++++[<+++++>-]<.>++++++++[<+++>-]<.+++.------.--------.[-]>++++++++[<++++>-]<+.[-]++++++++++.",
  );
  assertEquals(
    actual,
    "Hello World!",
  );
});

Deno.test("Hello,world! #2", async () => {
  const actual = await bf(
    "+++++++++[->++++++++>+++++++++++>+++++<<<]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.",
  );
  assertEquals(
    actual,
    "Hello,world!",
  );
});

Deno.test("print 'h'", async () => {
  const actual = await bf(
    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.",
  );
  assertEquals(
    actual,
    "H",
  );
});

Deno.test("print 'hoge'", async () => {
  const actual = await bf(
    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++.--------.--.",
  );
  assertEquals(
    actual,
    "hoge",
  );
});
