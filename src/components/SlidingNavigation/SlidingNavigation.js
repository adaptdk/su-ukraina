import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./SlidingNavigation.css";

const SlidingNavigation = ({ data, options }) => {
  const activeItemClassName = `SlidingNavigation__item--active`;
  const observerOptions = options || {
    threshold: 0.2,
  };
  const navigationRef = React.useRef(null);
  const navigationItemsRef = React.useRef(new Array());

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !window.location.hash.includes(entry.target.id)
        ) {
          window.history.replaceState({}, ``, `#${entry.target.id}`);
          const currentActiveElement = navigationItemsRef.current.find(
            (item) => {
              return item.className.includes(activeItemClassName);
            }
          );

          // Remove current active className
          if (currentActiveElement) {
            currentActiveElement.classList.remove(activeItemClassName);
          }

          const nextActiveElement = navigationItemsRef.current.find((item) => {
            return item.id.includes(entry.target.id);
          });

          // Add an active className
          if (nextActiveElement) {
            nextActiveElement.classList.add(activeItemClassName);
          }

          // Scroll to current active navigation item
          // in the SlidingNavigation
          const navigationWrapper =
            document.querySelector(`.SlidingNavigation`);
          if (navigationWrapper && nextActiveElement) {
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
      const element = document.getElementById(item.linkId);
      if (element) {
        observer.observe(element);
      }
    });
  }, []);

  const handleNavigationClick = (linkId) => {
    const element = document.getElementById(linkId);
    const headerHeight = document.querySelector(`.Header`).offsetHeight || 66; // 66 fallback
    const navbarHeight = navigationRef.current.offsetHeight || 63; // 63 fallback
    if (element) {
      window.scrollTo({
        top: element.offsetTop - headerHeight - navbarHeight + 1, // +1 because of css top: header - 1px;
        left: 0,
        behavior: `smooth`,
      });
    }
  };

  return (
    <div ref={navigationRef} className="SlidingNavigation">
      <div className="SlidingNavigation__wrapper">
        {data.map((item) => {
          return (
            <div
              ref={(element) => {
                return navigationItemsRef.current.push(element);
              }}
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
