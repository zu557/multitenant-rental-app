// src/app/(auth)/sign-in/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await getSession();

  if (user) redirect("/");

  return <SignInView />;
};

export default Page;
