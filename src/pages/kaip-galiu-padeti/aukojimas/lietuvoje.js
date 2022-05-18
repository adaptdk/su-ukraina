import { useEffect } from "react";
import { navigate } from "gatsby";

const Page = () => {
  useEffect(() => {
    navigate(`/kaip-galiu-padeti/aukojimas/#lietuvoje`);
  }, []);
  return null;
};

export default Page;
