'use server';

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
type LoginErrors = {
  email?: string;
  password?: string;
  global?: string;
};
type LoginState = {
  errors: LoginErrors;
} | null;
export const login = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log("--- SERVER ACTION CHECK ---");
  console.log("Received Email:", email);
  console.log("Received Password:", password);
  console.log("---------------------------");

  const errors: LoginErrors = {};

  if (!email) errors.email = "Please fill email";
  if (!password) errors.password = "Please fill password";
  if (Object.keys(errors).length > 0) return { errors };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { errors: { global: "Invalid email or password" } }; // ✅
        default:
          return { errors: { global: "System error!" } }; // ✅
      }
    }
    throw error;
  }
  return null;
};
export const logout = async () => {
  await signOut({ redirectTo: '/auth' });
};