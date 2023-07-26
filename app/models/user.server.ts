import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByLogin(login: User["login"]) {
  return prisma.user.findUnique({ where: { login } });
}

export async function createUser(login: User["login"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      login,
      hashedPassword,
    },
  });
}

export async function deleteUserByLogin(login: User["login"]) {
  return prisma.user.delete({ where: { login } });
}

export async function verifyLogin(
  login: User["login"],
  password: User["hashedPassword"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { login },
  });

  if (!userWithPassword || !userWithPassword.hashedPassword) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.hashedPassword
  );

  if (!isValid) {
    return null;
  }

  const { hashedPassword: _password, ...userWithoutPassword } =
    userWithPassword;

  return userWithoutPassword;
}
