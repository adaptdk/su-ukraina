import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import HeroSection, { HeroSectionPropTypes } from "../components/HeroSection";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";

import { seoPropTypes } from "../helpers/genericPropTypes";
import { formatRichText } from "../helpers/formatting";
import ContentfulModule from "../components/ContentfulModule/ContentfulModule";
import ContentfulModulePropTypes from "../components/ContentfulModule/ContentfulModulePropTypes";
import SlidingNavigation from "../components/SlidingNavigation";
import classNames from "classnames";
import { SlidingNavBlockPropTypes } from "../components/SlidingNavBlock/SlidingNavBlockPropTypes";

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
            return <ContentfulModule key={module.id} module={module} />;
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
