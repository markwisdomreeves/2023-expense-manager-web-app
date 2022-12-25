import React from "react";
import Moment from "moment";

const DateFormatter = ({ date }) => {
  return (
    <Moment format="D MMM YYYY" withTitle>
      {date}
    </Moment>
  );
};

export default DateFormatter;
