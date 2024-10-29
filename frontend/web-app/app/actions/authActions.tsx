import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session) return null;

    return session.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTokenWorkaround() {
  const req = {
    headers: Object.fromEntries(headers() as any),
    cookies: Object.fromEntries(
      (await cookies()).getAll().map((c: any) => [c.name, c.value])
    ),
  } as NextApiRequest;

  return await getToken({ req });
}
