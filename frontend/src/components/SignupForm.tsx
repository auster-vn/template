"use client";

import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await signup(username, email, password);
      localStorage.setItem("token", access_token);
      router.push("/"); // Redirect after signup
    } catch (err) {
      setError("Signup failed");
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
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
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
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
