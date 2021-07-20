import React, { useEffect, useState } from "react";
import { useI18n } from "next-localization";
import usePages from "../../utils/use-pages";
import Link from "next/link";

import EditPageModal from "./EditPageModal";
import TRsModal from "./TRsModal";
import axios from "axios";

const List = () => {
  const { pages, isLoading } = usePages();
  const [showPages, setShowPages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTrModal, setShowTrModal] = useState(false);
  const [pageViewId, setPageViewId] = useState(null);
  const i18n = useI18n();

  const removePage = async (pageId) => {
    if (window.confirm(i18n.t("list.areYouSure"))) {
      try {
        await axios.delete(`http://localhost:5000/pages/${pageId}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setShowPages(pages);
    }
  }, [pages]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {i18n.t("list.name")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {i18n.t("list.url")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {i18n.t("list.description")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {i18n.t("list.screenshot")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {i18n.t("list.textResource")}
                  </th>
                  <th
                    scope="col"
                    colSpan="2"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      onChange={(e) => {
                        setShowPages(
                          pages.filter((p) => p.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
                        );
                      }}
                      className="bg-white border w-full p-2 rounded-md"
                      placeholder={i18n.t("list.search")}
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading &&
                  showPages.map((page) => (
                    <tr key={page._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{page.name}</div>
                      </td>
                      <Link href={"/page/" + page._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                          {i18n.t("list.clickHere")}
                        </td>
                      </Link>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                        <a className="hover:text-indigo-500" href={page.image} target="_blank">
                          {i18n.t("list.clickHere")}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {page.textResources.length}
                        <span
                          className="ml-3 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                          onClick={() => {
                            setShowTrModal(true);
                            setPageViewId(page._id);
                          }}
                        >
                          ( View )
                        </span>
                      </td>
                      <td
                        className="px-6 py-4 text-sm font-medium text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setPageViewId(page._id);
                        }}
                      >
                        {i18n.t("list.edit")}
                      </td>
                      <td
                        className="px-6 py-4 text-sm font-medium text-red-600 hover:text-red-900 cursor-pointer"
                        onClick={() => {
                          removePage(page._id);
                        }}
                      >
                        {i18n.t("list.remove")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && <EditPageModal show={setShowModal} showTrModal={setShowTrModal} pageId={pageViewId} />}
      {showTrModal && <TRsModal show={setShowTrModal} pageId={pageViewId} />}
    </div>
  );
};

export default List;
