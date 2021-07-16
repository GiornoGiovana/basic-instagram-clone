import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { db } from "../firebase";
import firebase from "firebase";
import { useSuperHero } from "../SuperHeroContext";

export const Post = ({ post, postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { superHero } = useSuperHero();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => {
          setComments(
            snap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
    }
    return unsubscribe;
  }, [postId]);

  const handleComment = () => {
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      name: superHero.hero.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="bg-white border border-gray-300 mb-6">
      <div className="flex p-2">
        <img className="rounded-full w-10 h-10" src={post.heroImage} alt="" />
        <div className="flex flex-1 justify-between items-center ml-2">
          <h1 className="font-medium text-sm">{post.name}</h1>
          <DotsHorizontalIcon className="h-6 text-gray-600" />
        </div>
      </div>

      <img className="w-full" src={post.postImage} alt="" />

      <div className="p-4 pb-2">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <HeartIcon className="icon" />
            <ChatIcon className="icon" />
            <PaperAirplaneIcon className="icon" />
          </div>
          <BookmarkIcon className="icon" />
        </div>

        <div className="flex flex-col space-y-1 my-1">
          <h2 className="font-thin">999.999 likes</h2>
          <div className="flex space-x-1">
            <h2 className="font-medium">{post.name}</h2>
            <h2>{post.caption}</h2>
          </div>
        </div>
      </div>

      <div className="w-full px-4 pb-4">
        {comments.map((comment) => (
          <p key={comment.id}>
            <span className="font-medium">{comment.name}</span>{" "}
            {comment.comment}
          </p>
        ))}
      </div>

      {superHero.hero && (
        <div className="border-t border-gray-300 flex items-center p-2">
          <EmojiHappyIcon className="icon" />

          <form className="flex w-full ml-2">
            <input
              className="border-none flex-1 outline-none"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="text-blue-500 font-medium"
              disabled={!comment}
              onClick={handleComment}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
