import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

export class PasswordService {
  static async toHash(plainPassword: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const hash = (await promisify(scrypt)(plainPassword, salt, 32)) as Buffer;
    return hash.toString("hex") + "." + salt;
  }

  static async compare(
    plainPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    const [hashed, salt] = storedPassword.split(".");
    const hash = (await promisify(scrypt)(plainPassword, salt, 32)) as Buffer;
    const hashPassword = hash.toString("hex");
    return hashPassword === hashed;
  }
}
