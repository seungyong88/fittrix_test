import { FullPost } from "@/types/posts";
import React from "react";
import Avatar from "./ui/Avatar";
import { parseDate } from "@/utils/data";
import RunIcon from "../icons/RunIcon";
import ScrollableImageSlider from "./ui/ScrollableImageSlider";

type Props = {
  post: FullPost;
};

function PostsListCard({ post }: Props) {
  return (
    <article className="rounded-lg shadow-md border-gray-200 my-6">
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar image={post.author.url} />
          <span className="text-gray-900 font-bold ml-2">
            {post.author.username}
          </span>
        </div>
        <span className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(post._updatedAt)}
        </span>
      </div>
      <div className="w-full">
        <ScrollableImageSlider>
          {
            post.images.map((image) => (
              <img 
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
      <div>
        <p className="text-gray-900 font-bold p-4">{post.comment}</p>
      </div>
      <form className="flex border-t border-neutral-300 p-3">
        <RunIcon />
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full px-3 py-1 outline-none bg-red-100 text-xs"
        />
        <button className="text-blue-500 font-bold">Post</button>
      </form>
    </article>
  );
}

export default PostsListCard;
