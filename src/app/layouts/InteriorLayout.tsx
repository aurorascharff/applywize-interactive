import Header from "../components/Header";
import { Toaster } from "../components/ui/sonner";

export default function InteriorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
