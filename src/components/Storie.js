import React from "react";

export const Storie = ({ storie }) => {
  return (
    <div className="flex flex-col items-center justify-center w-20">
      <img className="rounded-full h-16 w-16" src={storie.imageUri} alt="" />
      <p className="text-xs truncate w-20 text-center">{storie.name}</p>
    </div>
  );
};
