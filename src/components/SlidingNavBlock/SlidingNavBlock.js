import * as React from "react";

import "./SlidingNavBlock.css";
import Icon from "../Icon";
import { ContentfulModule } from "../ContentfulModule";
import { SlidingNavBlockPropTypes } from "./SlidingNavBlockPropTypes";

const SlidingNavBlock = ({ id = ``, children, title, icon, data }) => {
  return (
    <div id={id} className="SlidingNavBlock">
      <div className="SlidingNavBlock__title-wrapper">
        <h2 className="SlidingNavBlock__title">
          {!!icon && <Icon type={icon} />}
          {title}
        </h2>
      </div>
      {children && <div className="SlidingNavBlock__content">{children}</div>}
      {!children && (
        <div className="SlidingNavBlock__content">
          <ContentfulModule module={data} />
        </div>
      )}
    </div>
  );
};

SlidingNavBlock.propTypes = SlidingNavBlockPropTypes;

export default SlidingNavBlock;
