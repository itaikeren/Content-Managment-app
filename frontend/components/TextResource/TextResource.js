import React, { useState } from "react";
import clsx from "clsx";

const TextResource = ({ trKey, value, metadata }) => {
  return (
    <div
      key={trKey}
      className={clsx(
        "prose",
        { "font-bold my-5": metadata.type === "h1" },
        {
          "my-5": metadata.type === "h2" || metadata.type === "h3" || metadata.type === "h4",
        },
        { "text-gray-500 my-5": metadata.type === "p" },
        { "break-words": metadata.multiLine }
      )}
    >
      <metadata.type>{value}</metadata.type>
    </div>
  );
};

export default TextResource;
