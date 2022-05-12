import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./SlidingNavigation.css";

const SlidingNavigation = ({ data, options }) => {
  const activeItemClassName = `SlidingNavigation__item--active`;
  const observerOptions = options || {
    threshold: 0.2,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !window.location.hash.includes(entry.target.id)
        ) {
          window.history.replaceState({}, ``, `#${entry.target.id}`);
          const currentActiveElement = document.querySelector(
            `.${activeItemClassName}`
          );

          // Remove current active className
          if (currentActiveElement) {
            currentActiveElement.classList.remove(activeItemClassName);
          }

          const nextActiveElement = document.getElementById(
            `${entry.target.id}-sn`
          );

          // Add an active className
          if (nextActiveElement) {
            nextActiveElement.classList.add(activeItemClassName);
          }

          // Scroll to current active navigation item
          // in the SlidingNavigation
          const navigationWrapper =
            document.querySelector(`.SlidingNavigation`);
          if (navigationWrapper) {
            navigationWrapper.scrollTo({
              top: 0,
              left:
                nextActiveElement.offsetLeft -
                nextActiveElement.offsetWidth / 2,
              behavior: `smooth`,
            });
          }
        }
      });
    }, observerOptions);

    data.forEach((item) => {
      observer.observe(document.getElementById(item.linkId));
    });
  }, []);

  const handleNavigationClick = (linkId) => {
    const element = document.getElementById(linkId);
    const headerHeight = document.querySelector(`.Header`).offsetHeight || 66; // 66 fallback
    const navbarHeight =
      document.querySelector(`.SlidingNavigation`).offsetHeight || 63; // 63 fallback

    window.scrollTo({
      top: element.offsetTop - headerHeight - navbarHeight,
      left: 0,
      behavior: `smooth`,
    });
  };

  return (
    <div className="SlidingNavigation">
      {data.map((item) => {
        return (
          <div
            id={`${item.linkId}-sn`}
            className={classNames(`SlidingNavigation__item`, {
              "SlidingNavigation__item--active":
                typeof window !== `undefined`
                  ? window.location.hash.includes(item.linkId)
                  : false,
            })}
            onClick={() => {
              return handleNavigationClick(item.linkId);
            }}
            key={item.linkId}
          >
            {!!item.icon && (
              <span
                className={`SlidingNavigation__icon SlidingNavigation__icon--${item.icon}`}
              />
            )}
            {item.title}
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