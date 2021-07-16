import React from "react";
import { Storie } from "./Storie";

const STORIES = [
  {
    id: 1,
    name: "Barry",
    imageUri:
      "https://pm1.narvii.com/6315/68104409be0f4905e0e62987ae214c2c47bde610_hq.jpg",
  },
  {
    id: 2,
    name: "Bruce",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKiUjuArJNRtEmjjwKikgSlwsZ021ksNIWSg&usqp=CAU",
  },
  {
    id: 3,
    name: "Clark Kent",
    imageUri:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/11/superman-2152853.jpg",
  },
  {
    id: 4,
    name: "Diana Prince",
    imageUri:
      "https://i.pinimg.com/originals/a8/15/82/a8158299c5ef73b17650d34eecbccd22.jpg",
  },
  {
    id: 5,
    name: "Hal Jordan",
    imageUri:
      "https://www.lacasadeel.net/wp-content/uploads/2020/05/GREENLANTERN80TH_Cv1_2010s-1-e1590156875441-1024x647-1.jpg",
  },
  {
    id: 7,
    name: "John Jones",
    imageUri:
      "https://pm1.narvii.com/6291/ebd8f16a852ad7ac1866bc2f924039b35cc1c442_hq.jpg",
  },
  {
    id: 6,
    name: "DSergio",
    imageUri:
      "https://scontent.flim2-2.fna.fbcdn.net/v/t1.6435-1/p160x160/125408832_3429751810427514_7356770729035804074_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFYmWWmJS4gIXKiAwezPc5FsqTaaNtdlhCypNpo212WEAAQ0y-993u2dIA4918Uk3sRovS8IO6qmp7CAEp16AP0&_nc_ohc=w7lYIt5as3YAX_UAfl6&_nc_ht=scontent.flim2-2.fna&tp=6&oh=c706fc1e5d6df05a687bb99977882647&oe=60E767AA",
  },
];

export const Stories = () => {
  return (
    <div
      className="flex items-center space-x-3 bg-white py-4 border border-gray-300 px-2
     mb-6"
    >
      {STORIES.map((storie) => (
        <Storie key={storie.id} storie={storie} />
      ))}
    </div>
  );
};
