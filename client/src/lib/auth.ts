// This file contains helper functions for authentication and user management using Payload CMS.
// It includes functions for registering a new user, logging in, and retrieving the current session.
// The functions interact with Payload's API and handle cookies for authentication. 
//icludes zod for validation and stripe for payment processing (commented out for now).
import { payload } from "./payload";
import { cookies } from "next/headers";
// import { stripe } from "./stripe";

interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  const cookieStore = await cookies();

  // Check if username exists
  const existingUserByUsername = await payload.find({
    collection: "users",
    limit: 1,
    where: {
      username: {
        equals: input.username,
      },
    },
  });

  if (existingUserByUsername.totalDocs > 0) {
    throw new Error("Username already taken");
  }

  // Check if email exists
  const existingUserByEmail = await payload.find({
    collection: "users",
    limit: 1,
    where: {
      email: {
        equals: input.email,
      },
    },
  });

  if (existingUserByEmail.totalDocs > 0) {
    throw new Error("Email already exists");
  }

  // Create Stripe account
//   const account = await stripe.accounts.create();
//   if (!account) throw new Error("Failed to create stripe account");

  // Create tenant
  const tenant = await payload.create({
    collection: "tenants",
    data: {
      name: input.username,
      slug: input.username,
    },
  });

  // Create user
  const user = await payload.create({
    collection: "users",
    data: {
      email: input.email,
      username: input.username,
      password: input.password,
    //   tenants: [{ tenant: tenant.id }],
    },
  });

  // Login user to get token
  const { token } = await payload.login({
    collection: "users",
    data: {
      email: input.email,
      password: input.password,
    },
    headers: {
      cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
  });

  if (!token) throw new Error("Failed to login");

  return token;
}

export async function loginUser(input: LoginInput) {
  const cookieStore = await cookies();

  const { token } = await payload.login({
    collection: "users",
    data: {
      email: input.email,
      password: input.password,
    },
    headers: {
      cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
  });

  if (!token) throw new Error("Failed to login");

  return token;
}

export async function getSession() {
  const cookieStore = await cookies();

  const { user } = await payload.auth({
    headers: {
      cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
  });

  return user;
}
