import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Link from "../Link";

import "./SlidingNavigation.css";

const SlidingNavigation = ({ data, options }) => {
  const [activeNode, setActiveNode] = React.useState(null);

  const observerOptions = options || {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && activeNode !== entry.target) {
        setActiveNode(entry.target.id);
      }
    });
  }, observerOptions);

  React.useEffect(() => {
    data.forEach((item) => {
      observer.observe(document.getElementById(item.linkId));
    });
  }, []);

  React.useEffect(() => {
    const activeNavigationItem = document.querySelector(
      `.SlidingNavigation__item--active`
    );
    if (activeNavigationItem) {
      activeNavigationItem.scrollIntoView();
    }
  }, [activeNode]);

  return (
    <div className="SlidingNavigation">
      {data.map((item) => {
        return (
          <div
            className={classNames(`SlidingNavigation__item`, {
              "SlidingNavigation__item--active": item.linkId === activeNode,
            })}
            key={item.linkId}
          >
            <Link to={`#${item.linkId}`}>
              {!!item.icon && (
                <span
                  className={`SlidingNavigation__icon SlidingNavigation__icon--${item.icon}`}
                ></span>
              )}
              {item.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

SlidingNavigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      linkId: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
  options: PropTypes.shape({
    threshold: PropTypes.number,
  }),
};

export default SlidingNavigation;
