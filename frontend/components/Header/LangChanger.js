import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, TranslateIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LangChanger() {
  const router = useRouter();

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium bg-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <TranslateIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-28 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <Link href={router.pathname} locale={"en"}>
                  <button className="text-gray-900 hover:bg-gray-200 hover:text-gray-700 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                    English
                  </button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={router.pathname} locale={"fr"}>
                  <button className="text-gray-900 hover:bg-gray-200 hover:text-gray-700 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                    Français
                  </button>
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
