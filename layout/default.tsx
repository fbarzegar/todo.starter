import { ReactNode } from "react";
import Header from "../component/header/header";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
