import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Layout from "../components/Layout";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";
import { HeroSection } from "../components/HeroSection";
import {
  ContentfulModule,
  ContentfulModulePropTypes,
} from "../components/ContentfulModule";
import SlidingNavigation from "../components/SlidingNavigation";
import { SlidingNavBlockPropTypes } from "../components/ContentfulModule/SlidingNavBlock";

import { formatRichText } from "../helpers/formatting";
import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";

const ModularPage = ({ path, pageContext }) => {
  const {
    currentNodeSlugs,
    navigation,
    node_locale,
    metaTitle,
    metaDescription,
    heroImage,
    pageHeading,
    pageDescription,
    modules,
    slidingNavData,
    includeContactForm,
    fullWidthModules,
    showBreadcrumbs,
    stickyHeader,
    promoLine,
    breadcrumb: { crumbs },
  } = pageContext;

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

    if (type === `ContentfulEventsModule`) {
      return {
        ...module,
        locale: node_locale,
      };
    }

    return module;
  };

  return (
    <Layout
      pagePath={path}
      includeContactForm={includeContactForm}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
      currentNodeSlugs={currentNodeSlugs}
      locale={node_locale}
      stickyHeader={stickyHeader}
      promoLine={promoLine}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

      <Constraint>
        {showBreadcrumbs && <NavigationGroup crumbs={crumbs} />}
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      <Constraint
        className={classNames({
          "Constraint--sliding-nav": slidingNavData,
          "Constraint--full-width": fullWidthModules,
        })}
      >
        {slidingNavData && <SlidingNavigation data={slidingNavData} />}
        {!!modules?.at(0) &&
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
    currentNodeSlugs: nodeSlugsPropTypes.isRequired,
    navigation: navigationPropTypes.isRequired,
    promoLine: promoLinePropTypes,
    node_locale: localePropType.isRequired,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    heroImage: gatsbyImagePropType,
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
    includeContactForm: PropTypes.bool,
    fullWidthModules: PropTypes.bool,
    showBreadcrumbs: PropTypes.bool,
    stickyHeader: PropTypes.bool,
  }),
};

ModularPage.defaultProps = {
  pageContext: {
    pageTitle: ``,
    pageDescription: {
      raw: ``,
    },
    organisations: [],
    includeContactForm: true,
    fullWidthModules: false,
    showBreadcrumbs: true,
    stickyHeader: true,
  },
};

export default ModularPage;
