import { useEffect } from "react";
import { navigate } from "gatsby";

const Page = () => {
  useEffect(() => {
    navigate(`/kaip-galiu-padeti/aukojimas/#uzsienyje`);
  }, []);
  return null;
};

export default Page;
