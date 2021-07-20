import React, { useEffect } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import clsx from "clsx";
import { useI18n } from "next-localization";

const NavItems = [
  {
    key: "dashboard",
    link: "/",
    external: false,
  },
  {
    key: "github",
    link: "https://github.com/itaikeren/Content-Managment-app",
    external: true,
  },
];

function findNavItemName() {
  for (let i = 0; i < NavItems.length; i++) {
    if (router.pathname === NavItems[i].link) {
      return NavItems[i].key;
    }
  }

  return "Untitled";
}

const Nav = ({ setPageTitle }) => {
  const router = useRouter();
  const i18n = useI18n();

  useEffect(() => {
    setPageTitle(findNavItemName());
  }, [router.pathname]);

  return (
    <div className="flex flex-row items-center space-x-2 text-sm">
      {NavItems.map((item) => (
        <Link key={item.key} href={item.link} passHref={item.external}>
          <span
            className={clsx(
              "cursor-pointer",
              { "bg-gray-900 p-2 px-3 rounded-lg text-white": router.pathname === item.link },
              { "text-gray-300 p-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white": router.pathname !== item.link }
            )}
          >
            {i18n.t(`nav.${item.key}.name`)}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Nav;
