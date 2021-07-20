import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useI18n } from "next-localization";
import axios from "axios";

export default function NewPageModal({ show }) {
  const [pageName, setPageName] = useState("");
  const [pageDesc, setPageDesc] = useState("");
  const [pageImage, setPageImage] = useState("");
  const i18n = useI18n();
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    show(false);
  }

  const addPage = async () => {
    try {
      await axios.post(`http://localhost:5000/pages/`, {
        name: pageName,
        description: pageDesc,
        url: pageName + "page",
        image: pageImage,
      });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

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
                  {i18n.t("modal.title")}
                </Dialog.Title>
                <div className="my-4">
                  <p className="text-sm text-gray-500">{i18n.t("modal.description")}</p>
                </div>

                <div className="flex flex-col space-y-3 divide-y">
                  <div className="w-full flex flex-row justify-between">
                    <label>{i18n.t("modal.pageName")}</label>
                    <input
                      className="font-light p-1 px-2 rounded-md border text-gray-500"
                      name="name"
                      onChange={(e) => setPageName(e.target.value)}
                      value={pageName}
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between pt-4">
                    <label>{i18n.t("modal.pageDesc")}</label>
                    <input
                      className="font-light p-1 px-2 rounded-md border text-gray-500"
                      name="desc"
                      onChange={(e) => setPageDesc(e.target.value)}
                      value={pageDesc}
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between pt-4">
                    <label>{i18n.t("modal.pageImage")}</label>
                    <input
                      className="font-light p-1 px-2 rounded-md border text-gray-500"
                      name="image"
                      onChange={(e) => setPageImage(e.target.value)}
                      value={pageImage}
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4 justify-center mt-5">
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={addPage}
                    >
                      {i18n.t("modal.btnSave")}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
