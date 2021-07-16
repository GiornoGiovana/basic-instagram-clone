import React from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { UploadPost } from "./UploadPost";
import { useSuperHero } from "../SuperHeroContext";

export const Sidebar = () => {
  const { superHero } = useSuperHero();

  return (
    <div className="hidden lg:inline-block lg:fixed lg:right-72 top-24 h-screen">
      <div className="flex">
        <div>
          <img
            className="rounded-full w-12 h-12"
            src={superHero.hero?.image}
            alt=""
          />
        </div>
        <div className="flex-1 flex justify-between items-center ml-3">
          <div className="flex flex-col justify-center">
            <h2 className="font-medium">{superHero.hero?.name}</h2>
            <h2 className="text-gray-500 font-thin">{superHero.hero?.slug}</h2>
          </div>
          <div>
            <DotsVerticalIcon className="h-7 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <UploadPost />
      </div>
    </div>
  );
};
