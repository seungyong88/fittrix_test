import { FullPost } from "@/types/posts";
import React from "react";
import ScrollableImageSlider from "./ui/ScrollableImageSlider";
import CommentBar from "./CommentBar";
import Avatar from "./ui/Avatar";

type Props = {
  post: FullPost;
};

function PostDetail({ post }: Props) {
  const { images, _createdAt, comments } = post;
  const date = new Date(_createdAt);
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const formattedDate: string = date.toLocaleString('ko-kr', options);
  
  return (
    <div className="w-[1000px] h-auto bg-white relative flex justify-start items-start">
      <div className="w-[650px]">
        <ScrollableImageSlider>
          {images.map((image) => (
            <img
              className="w-full h-full object-cover"
              key={image._key}
              src={image.url}
              alt={post.comment}
            />
          ))}
        </ScrollableImageSlider>
      </div>
      <div className="w-[350px] h-full">
        <div className="flex justify-center items-center mt-4">
          {formattedDate}
        </div>
        <div className="flex justify-between items-center px-4 pt-2 pb-4 border-b">
          <div className="flex justify-start items-center gap-2">
          <Avatar image={post.author.url} />
          <span className="text-gray-900 font-bold">
            {post.author.username}
          </span>
          <span>
            {post.comment}
          </span>
          </div>
          <div>
          <span>
            {post.exercise}
          </span>
          </div>
        </div>
        <CommentBar comments={comments} />
      </div>
    </div>
  );
}

export default PostDetail;
