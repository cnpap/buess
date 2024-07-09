import { randomBytes } from 'crypto';
import { argon2i } from 'hash-wasm';

export const randomString = (length = 32) => {
  return randomBytes(length).toString('hex').toString().slice(0, length);
};

export const hashPassword = async (password: string) => {
  return argon2i({
    password,
    salt: randomBytes(16),
    iterations: 256,
    parallelism: 1,
    memorySize: 4096,
    hashLength: 32,
    outputType: 'encoded',
  });
};
