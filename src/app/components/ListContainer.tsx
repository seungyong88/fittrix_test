"use client";

import React from "react";
import useSWR from "swr";
import ExerciseMenu from "./ExerciseMenu";
import { FullPost } from "@/types/posts";
import ListLoading from "./ui/ListLoading";
import PostsListCard from "./PostsListCard";
import { useSearchParams } from "next/navigation";

function ListContainer() {
  const searchParams = useSearchParams();
  const exercise = searchParams?.get('exercise') || 'all';

  const { data: posts, isLoading, error } = useSWR<FullPost[]>(`/api/posts?exercise=${exercise}`);

  if (error) return <div>Failed to load</div>;

  return (
    <>
      <ExerciseMenu />
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
