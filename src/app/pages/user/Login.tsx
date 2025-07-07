"use client";

import { useState, useTransition } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { finishPasskeyLogin, startPasskeyLogin } from "./functions";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertTitle } from "@/app/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { link } from "@/app/shared/links";
import AuthLayout from "@/app/layouts/AuthLayout";
import Link from "@/app/components/Link";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      window.location.href = "/";
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  return (
    <AuthLayout>
      <div className="absolute top-0 right-0 p-10">
        <a
          href={link("/user/signup")}
          className="font-display font-bold text-black text-sm underline underline-offset-8 hover:decoration-primary"
        >
          Register
        </a>
      </div>
      <div className="max-w-[400px] w-full mx-auto px-10 auth-form">
        <h1 className="text-center page-title">Login</h1>
        <p className="py-6">Enter your username below to sign-in.</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Button
          className="font-display w-full mb-6"
          onClick={handlePerformPasskeyLogin}
          disabled={isPending}
        >
          {isPending ? <>...</> : "Login with Passkey"}
        </Button>
        {result && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{result}</AlertTitle>
          </Alert>
        )}
        <p>
          By clicking continue, you agree to our{" "}
          <a href={link("/legal/terms")}>Terms of Service</a> and{" "}
          <a href={link("/legal/privacy")}>Privacy Policy</a>.
        </p>
      </div>
    </AuthLayout>
  );
}
