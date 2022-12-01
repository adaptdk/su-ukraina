import * as React from "react";
import PropTypes from "prop-types";
import { formatRichText } from "../../helpers/formatting";

const CardSection = ({ content, title }) => {
  return (
    <div className="CardSection">
      {!!title && <h3 className="CardSection__title">{title}</h3>}
      {!!content?.raw && (
        <div className="CardSection__content">
          {formatRichText(content.raw)}
        </div>
      )}
      {!content?.raw && <div className="CardSection__content">{content}</div>}
    </div>
  );
};

CardSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CardSection;
