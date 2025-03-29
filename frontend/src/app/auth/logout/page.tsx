"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/api/auth";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      localStorage.removeItem("token");
      router.push("/auth/login");
    };
    handleLogout();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Logging out...</p>
    </div>
  );
}
