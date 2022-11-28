import { Children } from "react";
import Header from "../component/header/header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      {Children}
    </>
  );
}
