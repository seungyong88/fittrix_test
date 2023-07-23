"use client";

import React from "react";
import useSWR from "swr";
import WorkMenu from "./WorkMenu";
import { FullPost } from "@/types/posts";
import ListLoading from "./ui/ListLoading";
import PostsListCard from "./PostsListCard";

function ListContainer() {
  const { data: posts, isLoading, error } = useSWR<FullPost[]>("/api/posts");

  if (error) return <div>Failed to load</div>;

  return (
    <>
      <WorkMenu />
      {isLoading && <ListLoading />}
      {!posts && <div></div>}
      {posts && (
        <div className="max-w-[420px] mx-auto ">
          {posts?.map((post) => (
            <PostsListCard post={post} key={post._id} />
          ))}
        </div>
      )}
    </>
  );
}

export default ListContainer;
