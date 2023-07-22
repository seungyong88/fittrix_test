import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

function ColorButton({ text, onClick }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 p-[0.15rem]`}
    >
      <button
        className="bg-red-100 rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default ColorButton;
