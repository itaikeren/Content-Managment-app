import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useI18n } from "next-localization";
import axios from "axios";

import useTextResources from "../../utils/use-textresources";
import useTextResource from "../../utils/use-textresource";

export default function TRsModal({ show, pageId }) {
  const [trId, setTrId] = useState("");
  const { trs, isLoading } = useTextResources(pageId);
  const { tr, loading } = useTextResource(trId);
  const [modalView, setModalView] = useState("all");
  const [trKey, setTrKey] = useState("");
  const [trValue, setTrValue] = useState("");
  const [trType, setTrType] = useState("");
  const [trMaxChar, setTrMaxChar] = useState("");
  const [trMultiline, setTrMultiline] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const i18n = useI18n();

  function closeModal() {
    setIsOpen(false);
    show(false);
  }

  const clearValues = () => {
    setTrKey("");
    setTrValue("");
    setTrType("h1");
    setTrMaxChar("");
    setTrMultiline("true");
  };

  const editTr = async () => {
    console.log(trKey, trValue, trType, trMaxChar, trMultiline);
    try {
      await axios.patch(`http://localhost:5000/tr/${trId}`, {
        key: trKey,
        value: trValue,
        type: trType,
        maxChar: trMaxChar,
        multiLine: trMultiline,
      });

      setModalView("all");
    } catch (error) {
      console.error(error);
    }
  };

  const removeTr = async () => {
    if (window.confirm(i18n.t("trModal.areYouSure"))) {
      try {
        await axios.delete(`http://localhost:5000/tr/${trId}`);

        setModalView("all");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addTr = async () => {
    try {
      await axios.post(`http://localhost:5000/tr/`, {
        key: trKey,
        value: trValue,
        type: trType,
        maxChar: trMaxChar,
        multiLine: trMultiline,
        pageid: pageId,
      });

      setModalView("all");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (trId && !loading) {
      setTrKey(tr.key);
      setTrValue(tr.value);
      setTrType(tr.metadata.type);
      setTrMaxChar(tr.metadata.maxChar);
      setTrMultiline(tr.metadata.multiLine);
    }
  }, [tr]);

  if (isLoading) return <div className="hidden">Loading...</div>;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            {/* View all mode */}
            {modalView === "all" && (
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {i18n.t("trModal.titleAll")}
                  </Dialog.Title>
                  <div className="my-4">
                    <p className="text-sm text-gray-500">{i18n.t("trModal.descriptionAll")}</p>
                  </div>

                  <div className="flex flex-col divide-y">
                    {trs.map((tr) => (
                      <div key={tr.key} className="w-full flex flex-row justify-between py-2">
                        <label>{tr.key}</label>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-800 bg-white rounded-md border shadow-sm hover:bg-gray-50"
                          onClick={() => {
                            setTrId(tr._id);
                            setModalView("edit");
                          }}
                        >
                          {i18n.t("trModal.editBtn")}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-row space-x-4 justify-center mt-5">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        clearValues();
                        setTrId("");
                        setModalView("add");
                      }}
                    >
                      {i18n.t("trModal.addNewBtn")}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            )}

            {/* Edit mode */}
            {trId && !loading && modalView === "edit" && (
              <Transition.Child as={Fragment}>
                <div className="inline-block w-full max-w-6xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex flex-row items-center"
                  >
                    <span onClick={() => setModalView("all")}>
                      <ChevronLeftIcon
                        className="w-7 h-7 hover:text-gray-600 cursor-pointer -ml-2"
                        aria-hidden="true"
                      />
                    </span>
                    {i18n.t("trModal.titleEdit")}
                  </Dialog.Title>
                  <div className="my-4">
                    <p className="text-sm text-gray-500">{i18n.t("trModal.descriptionEdit")}</p>
                  </div>

                  <div className="flex flex-col divide-y">
                    <div className="w-full flex flex-row justify-between py-2 space-x-2">
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.key")}
                        </label>
                        <input
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                          value={trKey}
                          onChange={(e) => setTrKey(e.target.value)}
                        ></input>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.value")}
                        </label>
                        <input
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                          value={trValue}
                          onChange={(e) => setTrValue(e.target.value)}
                        ></input>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.type")}
                        </label>
                        <select
                          value={trType}
                          onChange={(e) => setTrType(e.target.value)}
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                        >
                          <option value="h1">Heading 1</option>
                          <option value="h2">Heading 2</option>
                          <option value="h3">Heading 3</option>
                          <option value="h4">Heading 4</option>
                          <option value="p">Paragraph</option>
                        </select>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.maxChar")}
                        </label>
                        <input
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                          value={trMaxChar}
                          onChange={(e) => setTrMaxChar(e.target.value)}
                          type="number"
                          min={1}
                        ></input>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.multiLine")}
                        </label>
                        <select
                          value={trMultiline}
                          onChange={(e) => setTrMultiline(e.target.value)}
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row space-x-4 justify-center mt-5">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={editTr}
                    >
                      {i18n.t("trModal.saveBtn")}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={removeTr}
                    >
                      {i18n.t("trModal.removeBtn")}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            )}

            {/* Add new mode */}
            {modalView === "add" && (
              <Transition.Child as={Fragment}>
                <div className="inline-block w-full max-w-6xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex flex-row items-center"
                  >
                    <span onClick={() => setModalView("all")}>
                      <ChevronLeftIcon
                        className="w-7 h-7 hover:text-gray-600 cursor-pointer -ml-2"
                        aria-hidden="true"
                      />
                    </span>
                    {i18n.t("trModal.titleAdd")}
                  </Dialog.Title>
                  <div className="my-4">
                    <p className="text-sm text-gray-500">{i18n.t("trModal.descriptionAdd")}</p>
                  </div>

                  <div className="flex flex-col divide-y">
                    <div className="w-full flex flex-row justify-between py-2 space-x-2">
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.key")}
                        </label>
                        <input
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                          value={trKey}
                          onChange={(e) => setTrKey(e.target.value)}
                        ></input>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.value")}
                        </label>
                        <input
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                          value={trValue}
                          onChange={(e) => setTrValue(e.target.value)}
                        ></input>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.type")}
                        </label>
                        <select
                          value={trType}
                          onChange={(e) => setTrType(e.target.value)}
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                        >
                          <option value="h1">Heading 1</option>
                          <option value="h2">Heading 2</option>
                          <option value="h3">Heading 3</option>
                          <option value="h4">Heading 4</option>
                          <option value="p">Paragraph</option>
                        </select>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.maxChar")}
                        </label>
                        <input
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                          value={trMaxChar}
                          onChange={(e) => setTrMaxChar(e.target.value)}
                          type="number"
                          min={1}
                        ></input>
                      </div>
                      <div className="w-1/3 relative">
                        <label className="absolute text-xs -top-1.5 left-2 bg-white font-medium">
                          {i18n.t("trModal.multiLine")}
                        </label>
                        <select
                          value={trMultiline}
                          onChange={(e) => setTrMultiline(e.target.value)}
                          className="w-full text-sm border bg-white rounded-md p-2 text-gray-500 shadow-sm"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row space-x-4 justify-center mt-5">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={addTr}
                    >
                      {i18n.t("trModal.addBtn")}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            )}
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
