import Header from "../components/Header";

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
      </main>
    </div>
  );
}
