import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./SlidingNavigation.css";
import Icon from "../Icon";

const SlidingNavigation = ({ data, options }) => {
  const activeItemClassName = `SlidingNavigation__item--active`;
  const navigationRef = React.useRef(null);
  const navigationItemsRef = React.useRef(new Array());

  const defaultObserverOptions = () => {
    const headerHeight = document.querySelector(`.Header`).offsetHeight || 88; // 88 fallback
    const navbarHeight = navigationRef.current.offsetHeight || 56; // 56 fallback
    return {
      threshold: [0, 1],
      rootMargin: `-${headerHeight + navbarHeight}px 0px`,
    };
  };

  const setActiveNavigation = (id) => {
    window.history.replaceState({}, ``, `#${id}`);

    const currentActiveElement = navigationItemsRef.current.find((item) => {
      return item.className.includes(activeItemClassName);
    });

    // Remove current active className
    if (currentActiveElement) {
      currentActiveElement.classList.remove(activeItemClassName);
    }

    const nextActiveElement = navigationItemsRef.current.find((item) => {
      return item.id.includes(id);
    });

    // Add an active className
    if (nextActiveElement) {
      nextActiveElement.classList.add(activeItemClassName);
    }

    // Scroll to current active navigation item
    // in the SlidingNavigation
    const navigationWrapper = navigationRef.current;
    if (navigationWrapper && nextActiveElement) {
      navigationWrapper.scrollTo({
        top: 0,
        left: nextActiveElement.offsetLeft - nextActiveElement.offsetWidth / 2,
        behavior: `smooth`,
      });
    }
  };

  React.useEffect(() => {
    const observerOptions = options || defaultObserverOptions();
    const visible = [];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (visible.includes(entry.target.id) && !entry.isIntersecting) {
          return visible.splice(visible.indexOf(entry.target.id), 1);
        }
        if (!visible.includes(entry.target.id) && entry.isIntersecting) {
          return visible.push(entry.target.id);
        }
      });
      setActiveNavigation(visible[visible.length - 1]);
    }, observerOptions);

    data.forEach((item) => {
      const element = document.getElementById(item.linkId);
      if (element) {
        observer.observe(element);
      }
    });
  }, []);

  const handleNavigationClick = (e, linkId) => {
    const element = document.getElementById(linkId);
    const headerHeight = document.querySelector(`.Header`).offsetHeight || 88; // 88 fallback
    const navbarHeight = navigationRef.current.offsetHeight || 56; // 56 fallback
    if (element) {
      window.scrollTo({
        top: element.offsetTop - headerHeight - navbarHeight + 1, // +1 because of css top: header - 1px;
        left: 0,
        behavior: `smooth`,
      });
    }
    e.preventDefault();
  };

  return (
    <div ref={navigationRef} className="SlidingNavigation">
      <div className="SlidingNavigation__container">
        {data.map((item) => {
          return (
            <a
              ref={(element) => {
                return navigationItemsRef.current.push(element);
              }}
              id={`${item.linkId}-sn`}
              href={`#${item.linkId}`}
              className={classNames(`SlidingNavigation__item`, {
                "SlidingNavigation__item--active":
                  typeof window !== `undefined`
                    ? window.location.hash.includes(item.linkId)
                    : false,
              })}
              onClick={(e) => {
                return handleNavigationClick(e, item.linkId);
              }}
              key={item.linkId}
            >
              {!!item.icon && <Icon type={item.icon} />}
              {item.title}
            </a>
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
    threshold: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
    rootMargin: PropTypes.string,
  }),
};

export default SlidingNavigation;
