"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginForm() {
  const router = useRouter();
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
      router.push("/en/admin/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-xl">
        {/* Logo & Header */}
        <div className="text-center mb-xl">
          <div className="w-16 h-16 rounded-2xl bg-[--color-tide]/10 flex items-center justify-center mx-auto mb-lg">
            <Truck className="w-8 h-8 text-[--color-tide]" />
          </div>
          <h1 className="font-display text-[48px] text-primary mb-sm">CostaWay</h1>
          <p className="font-data-label text-[14px] text-[--color-stone] uppercase tracking-wider mb-sm">Admin Portal</p>
          <p className="font-body text-[18px] text-on-surface-variant">Sign in to manage your transfer business</p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-container-lowest card-border rounded-xl p-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`form-input w-full font-data-value text-[16px] text-primary p-3 focus:ring-0 bg-transparent`}
                placeholder="admin@costaway.com"
              />
              {errors.email && (
                <span className="text-error text-[12px] font-data-label">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`form-input w-full font-data-value text-[16px] text-primary p-3 focus:ring-0 bg-transparent`}
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-error text-[12px] font-data-label">{errors.password.message}</span>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-error-container/20 border border-error/30 text-error p-md rounded-lg font-data-label text-[14px]">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded-lg transition-opacity hover:opacity-90 active:scale-[0.98] font-bold flex items-center justify-center gap-sm mt-md"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center font-data-label text-[12px] text-[--color-stone] mt-lg">
          © 2026 CostaWay Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}