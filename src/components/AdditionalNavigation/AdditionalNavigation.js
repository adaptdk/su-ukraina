import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./AdditionalNavigation.css";

const handlePath = (additionalNavigationText) => {
  switch (additionalNavigationText.toLowerCase()) {
    case `savanorystė`:
      return `/kaip-galiu-padeti/savanoryste/`;
    case `aukojimas`:
      return `/kaip-galiu-padeti/aukojimas/lietuvoje/`;
    case `budinkite veikti`:
      return `/protesto-formos/budinkite-veikti/ambasada/`;
    case `prekių boikotas`:
      return `/`;
    case `akcijos`:
      return `/protesto-formos/akcijos/`;
    case `renginiai`:
      return `/protesto-formos/renginiai/`;
    case `patikima informacija`:
      return `/bukime-budrus/patikima-informacija/`;
    case `piliečio atmintinė`:
      return `/bukime-budrus/piliecio-atmintine/`;
    case `sukčiai ir dezinformacija`:
      return `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/`;
    case `žinokite ką perkate`:
      return `/bukime-budrus/zinokite-ka-perkate/`;
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
              <Link className="additional-navigation__item" to={path}>
                {additionalEl}
              </Link>
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
