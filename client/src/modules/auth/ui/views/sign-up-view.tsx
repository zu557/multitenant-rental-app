"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { registerSchema, RegisterSchema } from "@/modules/auth/schemas";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const SignUpView = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const username = form.watch("username");
  const usernameError = form.formState.errors.username;
  const showPreview = username && !usernameError;

  const onSubmit = async (values: RegisterSchema) => {
    try {
      // 1️⃣ Check username
      const usernameCheck = await fetch(
        `/api/users?where[username][equals]=${values.username}`
      );
      const usernameData = await usernameCheck.json();

       if (usernameData.totalDocs > 0) {
      toast.error("Username already taken");
      return;
    }

      // 2️⃣ Check email
      const emailCheck = await fetch(
        `/api/users?where[email][equals]=${values.email}`
      );
      const emailData = await emailCheck.json();

       if (emailData.totalDocs > 0) {
      toast.error("Email already exists");
      return;
    }

      // 3️⃣ Create tenant
      const tenantRes = await fetch("/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.username,
          slug: values.username,
        }),
      });

      const tenantData = await tenantRes.json();

      if (!tenantRes.ok) {
        throw new Error(tenantData.message || "Failed to create tenant");
      }

      // 4️⃣ Create user
      const userRes = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          username: values.username,
          password: values.password,
          // tenants: [{ tenant: tenantData.doc.id }],
        }),
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        throw new Error(userData.message || "Failed to create user");
      }

      // 5️⃣ Login user
      const loginRes = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // VERY IMPORTANT for cookies
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginData.message || "Login failed");
      }

      toast.success("Account created successfully!");
      router.push("/admin");
      router.refresh();

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      {/* Left */}
      <div className="h-screen w-full bg-[#F4F4F0] lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-8 lg:p-16"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span
                  className={cn(
                    "text-3xl tracking-tighter font-semibold",
                    poppins.className
                  )}
                >
                  MetaShopper.
                </span>
              </Link>

              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>

            <h2 className="text-4xl font-medium">
              Join over 1000+ retailers and start earning on MetaShopper.
            </h2>

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="yourstore" {...field} />
                  </FormControl>

                  <FormDescription
                    className={cn("hidden", showPreview && "block")}
                  >
                    Your store will be available at&nbsp;
                    <strong>{username}</strong>.shop.com
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-black text-white hover:bg-yellow-300 hover:text-black"
              variant="elevated"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Right */}
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default SignUpView;
