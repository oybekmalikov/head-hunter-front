// import { jwtVerify, SignJWT } from "jose";

// const secret = new TextEncoder().encode(
// 	process.env.JWT_SECRET || "default-secret"
// );

// export async function createToken(payload: any): Promise<string> {
// 	return await new SignJWT(payload)
// 		.setProtectedHeader({ alg: "HS256" })
// 		.setIssuedAt()
// 		.setExpirationTime("24h")
// 		.sign(secret);
// }

// export async function verifyToken(token: string): Promise<any> {
// 	try {
// 		const { payload } = await jwtVerify(token, secret);
// 		return payload;
// 	} catch (error) {
// 		return null;
// 	}
// }

// export function hashPassword(password: string): string {
// 	// Password hashing logic
// 	return password;
// }

// export function comparePassword(password: string, hash: string): boolean {
// 	// Password comparison logic
// 	return password === hash;
// }
