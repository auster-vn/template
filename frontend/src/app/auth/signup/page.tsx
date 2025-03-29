import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Sign Up</h1>
        <SignupForm />
      </div>
    </div>
  );
}
