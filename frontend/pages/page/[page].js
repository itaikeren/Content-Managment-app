import React from "react";
import Link from "next/link";
import axios from "axios";

import TextResource from "../../components/TextResource/TextResource";

const Page = ({ textResources, page }) => {
  return (
    <div className="w-full flex flex-col mt-10">
      <Link href="/">
        <div className="fixed mx-4 flex flex-row items-center bg-indigo-600 p-2 rounded-lg text-white cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <div className="mr-1">Dashboard</div>
        </div>
      </Link>
      <div className="flex flex-col w-full items-center space-y-10">
        <div className="uppercase text-xl font-semibold text-indigo-700">{page.name + " page"}</div>
        <div>
          {textResources.map((tr) => (
            <TextResource key={tr.key} trKey={tr.key} value={tr.value} metadata={tr.metadata} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const page = await axios.get(`http://localhost:5000/pages/${params.page}`);
  const textResources = await axios.get(`http://localhost:5000/tr/all/${params.page}`);
  return { props: { textResources: textResources.data.tr, page: page.data.page } };
}

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:5000/pages");
  const pages = await res.data.pages;

  const paths = pages.map((page) => ({
    params: { page: page._id },
  }));

  return { paths, fallback: false };
}

export default Page;
