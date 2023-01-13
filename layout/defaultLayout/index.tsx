import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
