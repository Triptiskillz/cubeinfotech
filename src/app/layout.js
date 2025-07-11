import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/navbar/Navbar";
import PrimaryFooter from "./components/footer/PrimaryFooter";
import WhatsAppButton from "./components/comman/WhatsAppButton";

export const metadata = {
  title: "My App",
  description: "Awesome Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>
        <WhatsAppButton />
        <PrimaryFooter />
      </body>
    </html>
  );
}
