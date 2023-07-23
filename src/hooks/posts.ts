import { FullPost, Comment } from "@/types/posts";
import useSWR from 'swr';
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

async function addComment(id: string, comment: string) {
  const response = await fetch(`/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, comment }),
  });

  return response.json();
}

export default function usePosts() {
  const searchParams = useSearchParams();
  const exercise = searchParams?.get('exercise') || 'all';

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost[]>(`/api/posts?exercise=${exercise}`);

  const postComment = useCallback(
    (post: FullPost, comment: string) => {
      const newPost = {
        ...post,
        commentsCount: post.commentsCount + 1,
      };
      const newPosts = posts?.map((p) => (p._id === post._id ? newPost : p));

      return mutate(addComment(post._id, comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, postComment };
}

