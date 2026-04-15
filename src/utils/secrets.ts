import { scrypt, randomBytes, timingSafeEqual } from "crypto";

const KEY_LENGTH = 32;
const DELIMETER = ".";

function hash(password: string) {
  return new Promise<string>((resolve, reject) => {
    // generate random 16 bytes long salt - recommended by NodeJS Docs
    const salt = randomBytes(16).toString("hex");

    scrypt(password, salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(`${salt}${DELIMETER}${derivedKey.toString("hex")}`);
    });
  });
}

function compare(password: string, storedHash: string) {
  return new Promise<boolean>((resolve, reject) => {
    const [salt, originalHash] = storedHash.split(DELIMETER);
    const hashKeyBuff = Buffer.from(originalHash, "hex");

    scrypt(password, salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(timingSafeEqual(hashKeyBuff, derivedKey));
    });
  });
}

export const secrets = { hash, compare };
