import React from "react";

import Section from "../../Section";
import Constraint from "../../Constraint";
import {
  PromotionBannerModuleDefaultProps,
  PromotionBannerModulePropTypes,
} from "./PromotionBannerModulePropTypes";

import "./PromotionBannerModule.css";
import Thumbnail from "./Thumbnail";
import Organisation from "./ContentComponents/Organisation";
import EventItem from "./ContentComponents/EventItem";

const PromotionBannerModule = ({
  heading,
  thumbnail,
  thumbnailUrl,
  content,
}) => {
  return (
    <Section>
      <Constraint>
        <div className="PromotionBannerModule">
          <Thumbnail img={thumbnail} url={thumbnailUrl} />
          <div className="PromotionBannerModule__content">
            {heading && <h2>{heading}</h2>}
            {content?.at(0) &&
              content.map((item) => {
                const type = item?.internal?.type;

                if (type === `ContentfulOrganisation`) {
                  return <Organisation {...item} />;
                }

                if (type === `ContentfulEventItem`) {
                  return <EventItem {...item} className="EventCard__raw" />;
                }

                return <div key={item}>item</div>;
              })}
          </div>
        </div>
      </Constraint>
    </Section>
  );
};

PromotionBannerModule.propTypes = PromotionBannerModulePropTypes;

PromotionBannerModule.defaultProps = PromotionBannerModuleDefaultProps;

export default PromotionBannerModule;
