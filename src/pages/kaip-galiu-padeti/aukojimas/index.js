import { useEffect } from "react";
import { navigate } from "@reach/router";

const Page = () => {
  useEffect(() => {
    navigate(`/kaip-galiu-padeti/aukojimas/lietuvoje/`);
  }, []);
  return null;
};

export default Page;
