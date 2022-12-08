import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@gatsbyjs/reach-router";
import { getTranslatedText } from "../../../utils/getTranslatedText";

import "./FaqNavCollapsible.css";
import Button from "../../Button";
import FaqNav from "./FaqNav";

const FaqNavCollapsible = ({ navData }) => {
  const { pathname } = useLocation();

  return (
    <div className="FaqNavCollapsible">
      <FaqNav pages={navData} pathname={pathname} />
      <div className="FaqNavCollapsible__actions">
        <label
          className="FaqNavCollapsible__close-trigger"
          htmlFor="faqnav-sensor"
        >
          <Button
            className="FaqNavCollapsible__close-trigger-button"
            color="primary"
            pretend
          >
            {getTranslatedText(`actions.close`)}
          </Button>
        </label>
      </div>
    </div>
  );
};

FaqNavCollapsible.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      pageHeading: PropTypes.string,
      slug: PropTypes.string,
      iconType: PropTypes.string,
    })
  ),
};

export default FaqNavCollapsible;
