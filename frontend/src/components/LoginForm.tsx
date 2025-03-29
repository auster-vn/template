"use client";

import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await login(username, password);
      localStorage.setItem("token", access_token);
      router.push("/"); // Redirect after login
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        required
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Login</Button>
    </form>
  );
}
