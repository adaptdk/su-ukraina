import PropTypes from "prop-types";
import { FaqItemPropTypes } from "../../Faq";

const StepsModulePropTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(FaqItemPropTypes)])
  ),
};

const StepsModuleDefaultProps = {
  steps: [],
};

export { StepsModuleDefaultProps, StepsModulePropTypes };
