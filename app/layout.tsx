import { StoreContext } from "@/context/Store";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreContext>
        <body className="bg-white">{children}</body>
      </StoreContext>
    </html>
  );
}
