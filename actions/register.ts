"use server";
import db from "@/lib/db";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, name, password } = validatedFields.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const userExist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    return { error: "User already exist!" };
  }
  await db.user.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });

  const verficationToken = await generateVerificationToken(email)
  await sendVerificationEmail(
    verficationToken.email,
    verficationToken.token
  )

  return { success: "Confirmation email sent!" };
};
