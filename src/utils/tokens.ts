import { SignJWT, jwtVerify } from "jose";

type Payload = {
  _id: string;
};

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

function create(userId: string) {
  return new SignJWT({ _id: userId } satisfies Payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

async function verify(token: string) {
  const { payload } = await jwtVerify<Payload>(token, getSecret());
  return payload;
}

export const tokens = { create, verify };
