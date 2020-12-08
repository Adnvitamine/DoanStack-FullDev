import React, { Fragment } from "react";
//import Truncate from 'react-truncate-html';

const TruncateDescription = ({ product }) => {
  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </Fragment>
  );
};

export default TruncateDescription;
