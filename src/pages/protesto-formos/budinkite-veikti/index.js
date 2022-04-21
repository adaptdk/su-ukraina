import { useEffect } from "react";
import { navigate } from "gatsby";

const Page = () => {
  useEffect(() => {
    navigate(`/protesto-formos/budinkite-veikti/ambasada/`);
  }, []);
  return null;
};

export default Page;
