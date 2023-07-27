import { useEffect } from "react";
import { NavBar } from "../../components/index";
import { ScrollRestoration } from "react-router-dom"; //scroll to top for Paths mentioned
export function GlobalHeader() {
  const paths = ["/menu", "/restaurants"];
  //to clear local storage on refresh/on tab close / on browser close
  const clearLocalStorageOnClose = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearLocalStorageOnClose);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnClose);
    };
  }, []);
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
