"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: data.email, password: data.password }),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      const result = await response.json();
      localStorage.setItem("admin_token", result.access_token);
      window.location.href = "/en/admin/dashboard";
    } catch { setError("Invalid email or password"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
      <div className="bg-surface-container-lowest border border-outline/20 rounded-lg p-xl w-full max-w-md">
        <div className="text-center mb-lg"><h1 className="font-headline-md text-[32px] text-primary mb-sm">Admin Login</h1><p className="font-body-lg text-[18px] text-on-surface-variant">Sign in to manage bookings and routes</p></div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
          <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Email</label><input type="email" {...register("email")} className={`w-full bg-surface-container-low border ${errors.email ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="admin@costaway.com" />{errors.email && <span className="text-error text-[12px]">{errors.email.message}</span>}</div>
          <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Password</label><input type="password" {...register("password")} className={`w-full bg-surface-container-low border ${errors.password ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="••••••••" />{errors.password && <span className="text-error text-[12px]">{errors.password.message}</span>}</div>
          {error && <div className="bg-error-container text-on-error-container p-sm rounded font-data-label text-[14px]">{error}</div>}
          <button type="submit" disabled={isSubmitting} className="cta-button font-data-label text-[14px] py-sm px-md rounded transition-colors w-full text-center disabled:opacity-50 flex items-center justify-center gap-sm mt-sm">{isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}{isSubmitting ? "Signing in..." : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
}