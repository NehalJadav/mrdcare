export type { Document } from "https://deno.land/x/mongo/mod.ts";
export type { Header, Payload } from "https://deno.land/x/djwt/mod.ts";
export type {
  RouterContext,
  RouterMiddleware,
  State,
} from "https://deno.land/x/oak/mod.ts";
export type { DenonConfig } from "https://deno.land/x/denon/mod.ts";
export type { CreateIndexOptions } from "https://deno.land/x/mongo/mod.ts";

import * as yup from "npm:yup";
//export { compare, genSalt, hash } from "https://deno.land/x/bcrypt/mod.ts";
import {
  compare as comparePromise,
  compareSync,
  genSalt,
  hash as hashPromise,
  hashSync,
} from "https://deno.land/x/bcrypt/mod.ts";
export { genSalt };

export const isRunningInDenoDeploy = (globalThis as any).Worker === undefined; // This is crude check for if the code in running in Deno Deploy. It works for now but may not work in the future.

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
    new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;
export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
    new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;

export {
  Application,
  Context,
  helpers,
  isHttpError,
  Router,
  send,
  Status,
} from "https://deno.land/x/oak/mod.ts";
export { loadSync } from "https://deno.land/std/dotenv/mod.ts";
export { getLogger, handlers, setup } from "https://deno.land/std/log/mod.ts";
export { Bson, MongoClient } from "https://deno.land/x/mongo/mod.ts";
export { oakCors } from "https://deno.land/x/cors/mod.ts";
export { create, decode, verify } from "https://deno.land/x/djwt/mod.ts";
export { superoak } from "https://deno.land/x/superoak/mod.ts";
export {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std/testing/bdd.ts";
export { expect } from "https://deno.land/x/expect/mod.ts";
export { yup };
