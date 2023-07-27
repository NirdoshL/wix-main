import React from "react";
import { NavBar } from "../../components/index";
import { ScrollRestoration } from "react-router-dom";
export function GlobalHeader() {
  const paths = ["/menu", "/restaurants"];
  return (
    <>
      <ScrollRestoration
        getKey={(location, matches) => {
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      />
      <NavBar />
    </>
  );
}
