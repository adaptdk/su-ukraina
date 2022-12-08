import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Layout from "../components/Layout";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";
import { HeroSection, HeroSectionPropTypes } from "../components/HeroSection";
import {
  ContentfulModule,
  ContentfulModulePropTypes,
} from "../components/ContentfulModule";
import SlidingNavigation from "../components/SlidingNavigation";
import { SlidingNavBlockPropTypes } from "../components/ContentfulModule/SlidingNavBlock";

import { seoPropTypes } from "../helpers/genericPropTypes";
import { formatRichText } from "../helpers/formatting";

const ModularPage = ({ path, pageContext }) => {
  const {
    seo,
    hero,
    pageHeading,
    pageDescription,
    modules,
    slidingNavData,
    breadcrumb: { crumbs },
  } = pageContext;

  console.log({ modules });
  console.log(`tihs: `, slidingNavData);

  // in some cases you want to add extra props to a module
  // this function does exactly that
  const supplementModule = (module) => {
    const type = module?.internal?.type;
    if (type === `ContentfulFaqNavigation`) {
      return {
        ...module,
        pathname: path,
      };
    }

    return module;
  };

  return (
    <Layout pagePath={path} seo={seo}>
      {hero && <HeroSection {...hero} />}

      <Constraint>
        <NavigationGroup crumbs={crumbs} />
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      <Constraint
        className={classNames({
          "Constraint--sliding-nav": slidingNavData,
        })}
      >
        {slidingNavData && <SlidingNavigation data={slidingNavData} />}
        {!!modules.at(0) &&
          modules.map((module) => {
            return (
              <ContentfulModule
                key={module.id}
                module={supplementModule(module)}
              />
            );
          })}
      </Constraint>
    </Layout>
  );
};

ModularPage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.arrayOf(
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          crumbLabel: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    seo: PropTypes.shape(seoPropTypes).isRequired,
    hero: PropTypes.shape(HeroSectionPropTypes),
    pageHeading: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    modules: PropTypes.arrayOf(ContentfulModulePropTypes),
    slidingNavData: PropTypes.arrayOf(
      PropTypes.shape({
        ...SlidingNavBlockPropTypes,
        linkId: PropTypes.string.isRequired,
      })
    ),
  }),
};

ModularPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
};

export default ModularPage;
