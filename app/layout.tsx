import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo-App",
  description: "Todo list app with persisted localStorage task.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
