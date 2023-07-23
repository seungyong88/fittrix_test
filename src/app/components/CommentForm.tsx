import React from "react";
import CommentIcon from "../icons/CommentIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

function CommentForm({ onPostComment } : Props ) {
  const [comment, setComment] = React.useState("");
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex border-t border-neutral-300 p-3"
    >
      <CommentIcon />
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full px-3 py-1 outline-none bg-red-100 text-xs"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button disabled={buttonDisabled} className={`${buttonDisabled ?'text-blue-200':'text-blue-500'} font-bold`}>Post</button>
    </form>
  );
}

export default CommentForm;
