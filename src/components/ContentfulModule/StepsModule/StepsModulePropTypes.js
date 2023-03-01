import PropTypes from "prop-types";
import { FaqItemPropTypes } from "../../Faq";

const StepsModulePropTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(FaqItemPropTypes)])
  ),
  fullWidth: PropTypes.bool,
};

const StepsModuleDefaultProps = {
  steps: [],
  fullWidth: false,
};

export { StepsModuleDefaultProps, StepsModulePropTypes };
