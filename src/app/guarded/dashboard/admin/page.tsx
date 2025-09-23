"use client";

import { useAuth } from "@/features/auth/components/auth-context";
import { LogOutButton } from "@/components/custom/log-out-button";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { user, isLoading, error } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user?.role !== "admin") {
    redirect("/guarded/dashboard");
  }

  return (
    <div>
      AdminDashboard {user?.firstName} {user?.lastName}
      <LogOutButton />
    </div>
  );
}
