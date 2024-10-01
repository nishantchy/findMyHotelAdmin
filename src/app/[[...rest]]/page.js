"use client";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}
