import React from "react";

import {
  LinkCollectionModuleDefaultProps,
  LinkCollectionModulePropTypes,
} from "./LinkCollectionModulePropTypes";
import LcmWithImage from "./variants/LcmWithImage";
import LcmDefault from "./variants/LcmDefault";
import LcmLightBlocks from "./variants/LcmLightBlocks";

const LinkCollectionModule = (props) => {
  const { variant } = props;

  if (variant === `with-image`) {
    return <LcmWithImage {...props} />;
  }

  if (variant === `light-blocks`) {
    return <LcmLightBlocks {...props} />;
  }

  return <LcmDefault {...props} />;
};

LinkCollectionModule.propTypes = LinkCollectionModulePropTypes;

LinkCollectionModule.defaultProps = LinkCollectionModuleDefaultProps;

export default LinkCollectionModule;
