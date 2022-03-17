import { useEffect } from "react";
import { navigate } from "@reach/router";

const Page = () => {
  useEffect(() => {
    navigate(`/bukime-budrus/zinokite-ka-perkate/imoniu-sarasas/`);
  }, []);
  return null;
};

export default Page;
