"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const LogOutButton = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return <Button onClick={handleLogOut}>Log Out</Button>;
};
