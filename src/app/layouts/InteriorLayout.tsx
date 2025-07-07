import { Suspense } from "react";
import Header from "../components/Header";
import { Toaster } from "../components/ui/sonner";
import type { LayoutProps } from "rwsdk/router";

export default function InteriorLayout({ children }: LayoutProps) {
  return (
    <div className="page-wrapper">
      <main className="page bg-white">
        <Header />
        {children}
        <Toaster position="top-right" richColors />
      </main>
    </div>
  );
}
