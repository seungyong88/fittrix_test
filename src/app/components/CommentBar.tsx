import React from "react";
import Avatar from "./ui/Avatar";

type Props = {
  comments: any[];
};

function CommentBar({ comments }: Props) {
  return (
    <div className="px-3">
      {comments.map((comment) => (
        <div key={comment._key} className="flex justify-start items-center gap-2 mt-2">
          <Avatar image={comment.url} size="small" />
          <span className="font-bold">{comment.author.username}</span>
          <span>{comment.comment}</span>
        </div>
      ))}
    </div>
  );
}

export default CommentBar;
