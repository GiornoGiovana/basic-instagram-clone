import React from "react";
import { Post } from "./Post";

export const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} postId={post.id} post={post.post} />
      ))}
    </div>
  );
};
