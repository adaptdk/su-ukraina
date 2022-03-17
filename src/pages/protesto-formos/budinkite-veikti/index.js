import { useEffect } from "react";
import { navigate } from "@reach/router";

const Page = () => {
  useEffect(() => {
    navigate(`/protesto-formos/budinkite-veikti/ambasada/`);
  }, []);
  return null;
};

export default Page;
