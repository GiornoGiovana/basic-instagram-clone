import React from "react";
import {
  SearchIcon,
  HeartIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSuperHero } from "../SuperHeroContext";

export const Header = () => {
  const { superHero } = useSuperHero();

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between px-5 py-2 sm:justify-evenly 
	 sm:px-4 border-b border-gray-300 bg-white"
    >
      <img
        className="h-9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="INSTAGRAM"
      />
      <div className="hidden sm:inline-flex items-center p-1 bg-gray-100 border-gray-300 border rounded-md">
        <SearchIcon className="h-5 text-gray-400" />
        <input
          className="outline-none bg-gray-100 pl-1"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center space-x-3 sm:space-x-5">
        <HomeIcon className="h-7" />
        <PaperAirplaneIcon className="h-7" />
        <GlobeAltIcon className="h-7" />
        <HeartIcon className="h-7" />
        <div className="cursor-pointer">
          <img
            className="rounded-full h-7 w-7"
            src={superHero.hero?.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
