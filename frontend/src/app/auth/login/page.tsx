import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
