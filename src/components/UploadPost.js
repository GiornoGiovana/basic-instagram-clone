import React, { useRef, useState } from "react";
import { PhotographIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { useSuperHero } from "../SuperHeroContext";

export const UploadPost = () => {
  const fileRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [imagePost, setImagePost] = useState(null);

  const { superHero } = useSuperHero();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!caption) return;

    db.collection("posts")
      .add({
        caption: caption,
        name: superHero.hero.name,
        slug: superHero.hero.slug,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        heroImage: superHero.hero.image,
      })
      .then((doc) => {
        if (imagePost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imagePost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              //When the upload complets
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts")
                    .doc(doc.id)
                    .set({ postImage: url }, { merge: true });
                });
            }
          );
        }
      });

    setCaption("");
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImagePost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImagePost(null);
  };

  return (
    <form className="flex flex-col space-y-4">
      <h1 className="text-center font-semibold text-lg">New Post!</h1>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Caption"
          className="input"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div onClick={() => fileRef.current.click()}>
          <PhotographIcon className="h-7 text-gray-400" />
          <input hidden onChange={addImageToPost} type="file" ref={fileRef} />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!caption}
        className="w-full border rounded-2xl border-gray-400 font-semibold py-1 bg-white"
      >
        Upload
      </button>
      {imagePost && (
        <div
          className="flex flex-col filter hover:brightness-110 transition duration-150
          transform hover:scale-105 curor-pointer"
          onClick={removeImage}
        >
          <img className="h-20 object-contain" src={imagePost} alt="" />
          <p className="text-xs text-red-500 text-center cursor-pointer">
            Remove
          </p>
        </div>
      )}
    </form>
  );
};
