'use client';

import { FullPost } from "@/types/posts";
import React from "react";
import Avatar from "./ui/Avatar";
import { parseDate } from "@/utils/data";
import RunIcon from "../icons/RunIcon";
import ScrollableImageSlider from "./ui/ScrollableImageSlider";
import BenchIcon from "../icons/BenchIcon";
import SquatIcon from "../icons/SquatIcon";
import ETCIcon from "../icons/ETCIcon";
import LungeIcon from "../icons/LungeIcon";
import CommentForm from "./CommentForm";
import usePosts from "@/hooks/posts";
import ModalPortal from "./ui/ModalPortal";
import DefaultModal from "./DefaultModal";
import PostDetail from "./PostDetail";
import { useSession } from "next-auth/react";

type Props = {
  post: FullPost;
};

const getIcon = (exercise: string) => {
  switch (exercise) {
    case "running":
      return <RunIcon />;
    case "bench":
      return <BenchIcon />;
    case "squat":
      return <SquatIcon />;
    case "lunge":
      return <LungeIcon />;
    default:
      return <ETCIcon />;
  }
};

function PostsListCard({ post }: Props) {
  const {data: session} = useSession();
  const { postComment } = usePosts();
  const [ openModal, setOpenModal ] = React.useState(false);

  const handlePostComment = (comment: string) => {
    postComment(post, comment);
  };

  const handleDelete = async (id: string) => {
    // const result = confirm("Are you sure you want to delete this post?");
    const res = await fetch(`/api/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.status === 200) {
      alert("Post deleted successfully");
      window.location.reload();
    }
  };

  return (
    <article className="rounded-lg shadow-md border-gray-200 my-6">
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar image={post.author.url} />
          <span className="text-gray-900 font-bold ml-2">
            {post.author.username}
          </span>
        </div>
        <div>
          <span className="text-xs text-neutral-500 uppercase my-2">
            {parseDate(post._updatedAt)}
          </span>
          {session?.user.userType === "admin" && (
            <button
              className="text-xs text-white bg-red-900 p-2 uppercase ml-3 rounded-md"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="w-full" onClick={() => setOpenModal(true)}>
        <ScrollableImageSlider>
          {
            post.images.map((image) => (
              <img 
                key={image.url}
                className="w-full object-cover aspect-square"
                src={image.url} 
                alt={post.comment} 
                width={500} 
                height={500} 
               />
            ))
          }
        </ScrollableImageSlider>
      </div>
       
        {/* <p className="text-gray-900 font-bold p-4">{post.exercise}</p> */}
      <div className="flex flex-col items-start justify-center pl-3">
        <div className="flex items-center">
          {getIcon(post.exercise)}
          <p className="text-gray-900 font-bold p-2">{post.comment}</p>
        </div>
        {post?.commentsCount >= 1 && (
          <button className="font-bold my-2 text-sky-500 text-xs" onClick={() => setOpenModal(true)}>
            View all {post.commentsCount} comments
          </button>
        )}
      </div>
      <CommentForm onPostComment={handlePostComment} />
      {openModal && (
        <ModalPortal>
          <DefaultModal onClose={() => setOpenModal(false)} openModal={openModal}>
            <PostDetail post={post} />
          </DefaultModal>
        </ModalPortal>
      )}
    </article>
  );
}

export default PostsListCard;
