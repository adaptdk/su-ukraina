import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./AdditionalNavigation.css";

const handlePath = (additionalNavigationText) => {
  switch (additionalNavigationText.toLowerCase()) {
    case `savanorystė`:
      return `/kaip-galiu-padeti/savanoryste/`;
    case `aukojimas`:
      return `/kaip-galiu-padeti/aukojimas/`;
    case `darykite spaudimą`:
      return `/protesto-formos/darykite-spaudima/`;
    case `prekių boikotas`:
      return `/`;
    case `akcijos ir renginiai`:
      return `/protesto-formos/akcijos/`;
    case `patikima informacija`:
      return `/bukime-budrus/patikima-informacija/`;
    case `piliečio atmintinė`:
      return `/bukime-budrus/piliecio-atmintine/`;
    case `kaip apsisaugoti nuo sukčių?`:
      return `/`;
  }
};
const AdditionalNavigation = ({ additionalNav }) => {
  return (
    <nav className="additional-navigation">
      <ol className="additional-navigation__container">
        {additionalNav.map((additionalEl, index) => {
          let path = handlePath(additionalEl);
          return (
            <li key={index}>
              <Link className="additional-navigation__item" to={path}>{additionalEl}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

AdditionalNavigation.propTypes = {
  additionalNav: PropTypes.arrayOf(PropTypes.string),
};

export default AdditionalNavigation;