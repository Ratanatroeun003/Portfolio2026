'use server';
import { redirect } from "next/navigation";
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
          return { errors: { global: "Invalid email or password" } };
        default:
          return { errors: { global: "System error!" } };
      }
    }
    throw error;
  }
 redirect("/admin/dashboard");
};
export const logout = async () => {
  await signOut({
    redirect: false,
  });

  redirect("/auth");
};