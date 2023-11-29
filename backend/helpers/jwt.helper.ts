import { create, Status, verify } from "../deps.ts";
import type { Header, Payload } from "../deps.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";

const secretKey = "mrdcare";

// Function to generate or retrieve the key
const getKey = async (): Promise<CryptoKey> => {
  // You can use a key derivation function here if needed
  const encoder = new TextEncoder();
  const keyData = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
  return keyData;
};

class JwtHelper {
  /**
   * Generate JWT token
   * @param exp Expiry
   * @param id
   * @returns String Returns JWT
   */
  public static async getToken(exp: number, id: string): Promise<string> {
    const now = Date.now(); // in millis
    const header: Header = {
      alg: "HS512",
      typ: "JWT",
    };
    const payload: Payload = {
      iss: "deno_rest",
      iat: now,
      id,
      exp,
    };

    const key = await getKey();
    return create(header, payload, key);
  }

  /**
   * Validates JWT and returns JWT payload
   * @param token
   * @param type
   * @returns Promise<Payload | Error> Returns JWT payload
   */
  public static async getJwtPayload(
    token: string,
    type = "access_token",
  ): Promise<Payload | Error> {
    try {
      const key = await getKey();
      return await verify(token, key);
    } catch (_e) {
      const tokenType = (type === "access_token")
        ? "access_token"
        : "refresh_token";
      return throwError({
        status: Status.Unauthorized,
        name: "Unauthorized",
        path: tokenType,
        param: tokenType,
        message: `${tokenType} is invalid`,
        type: "Unauthorized",
      });
    }
  }
}

export default JwtHelper;
