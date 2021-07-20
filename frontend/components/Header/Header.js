import React, { useState } from "react";
import { useI18n } from "next-localization";

import Nav from "./Nav";
import LangChanger from "./LangChanger";

const Header = () => {
  const [pageTitle, setPageTitle] = useState("");
  const i18n = useI18n();

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row items-center p-4 space-x-4 bg-gray-800">
        <div className="text-3xl font-bold w-10 h-10 rounded-full bg-indigo-600"></div>
        <div className="w-full flex flex-row items-center justify-between">
          <Nav setPageTitle={setPageTitle} />
          <LangChanger />
        </div>
      </div>
      <div className="h-16 bg-white shadow mb-5 p-2.5 px-5">
        <span className="text-4xl font-bold">{i18n.t(`nav.${pageTitle}.title`)}</span>
      </div>
    </div>
  );
};

export default Header;
