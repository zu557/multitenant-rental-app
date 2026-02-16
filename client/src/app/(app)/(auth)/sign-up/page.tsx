// src/app/(auth)/sign-in/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import  SignUpView  from "@/modules/auth/ui/views/sign-up-view";

export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await getSession();
  // console.log("Current user session:", user);

  if (user) redirect("/admin");


  return <SignUpView />;
};

export default Page;
