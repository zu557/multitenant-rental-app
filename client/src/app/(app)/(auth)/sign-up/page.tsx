import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
// src/app/(auth)/sign-up/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await getSession();

  if (user) redirect("/");

  return <SignUpView />;
};

export default Page;
