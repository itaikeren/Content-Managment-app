import React, { useState } from "react";
import { useI18n } from "next-localization";
import NewPageModal from "../PagesList/NewPageModal";

import List from "./List";

const PagesList = () => {
  const [showModal, setShowModal] = useState(false);
  const i18n = useI18n();

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="text-lg text-gray-600 text-center">{i18n.t("dashboard.welcomeSts")}</div>
      <List />
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 left-8 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        >
          {i18n.t("dashboard.addPage")}
        </button>
      </div>
      {showModal && <NewPageModal show={setShowModal} />}
    </div>
  );
};

export default PagesList;
