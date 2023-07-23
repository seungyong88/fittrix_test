"use client";

import { useRef } from "react";
import { User } from "@/types/user";
import React from "react";
import FilesIcon from "../icons/FilesIcon";
import Avatar from "./ui/Avatar";
import { useRouter } from "next/navigation";
import { GridLoader } from "react-spinners";
import ChoiceExerciseMenu from "./ChoiceExerciseMenu";

type Props = {
  user: User;
};

function NewPost({ user }: Props) {
  // const [files, setFiles] = React.useState<any>([]);
  const [dagging, setDragging] = React.useState(false);
  const [imageArray, setImageArray] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [exercise, setExercise] = React.useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    }

    if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    if (imageArray.length >= 5) {
      return;
    }

    const tempFile = e.dataTransfer?.files;
    if (tempFile) {
      setImageArray([...imageArray, tempFile[0]]);
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    if (imageArray.length >= 5) {
      return;
    }

    const tempFile = (e.target as HTMLInputElement).files;

    if (tempFile) {
      setImageArray([...imageArray, tempFile[0]]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if(exercise === "") {
      setError("Please select an exercise");
      return;
    }

    e.preventDefault();
    if (!imageArray.length) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    imageArray.forEach((image: any) => formData.append('images', image));
    formData.append("text", (textRef.current?.value as string) || "");
    formData.append("exercise", (exercise as string));

    fetch("/api/new", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError("error");
        }else{
          router.push("/");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const typeClick = (type: string) => {
    setExercise(type);
  }

  return (
    <section className="w-full max-w-lg mx-auto flex flex-col justify-center items-center mt-6">
      { error && <p className="w-full bg-red-500 text-white p-4 my-4 rounded-md flex justify-center items-center">{error}</p>}
      { loading && <div className="fixed inset-0 z-10 bg-black/50 flex justify-center items-center"><GridLoader /></div> }
      <div className="flex justify-center items-center gap-2">
        <Avatar image={user.url} />
        <span>{user.username}</span>
      </div>
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`
            w-full h-60 flex flex-col items-center justify-center my-2 rounded-md
            ${
              !imageArray.length
                ? "border-2 border-dashed border-sky-500"
                : "border border-black"
            }
          `}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dagging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none"></div>
          )}

          <div className="flex flex-col z-0 items-center pointer-events-none">
            <FilesIcon size="large" />
            <p>Drag and Drop your image here or click</p>
          </div>
        </label>
        <div className="flex gap-4 w-full justify-evenly">
          {imageArray.length > 0 &&
            imageArray.map((image: any, index: number) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-20 h-20"
              />
            ))}
        </div>
        <textarea
          name="text"
          id="input-text"
          className="outline-none text-lg border border-neutral-300 mt-2 rounded-md p-4"
          required
          rows={10}
          placeholder="Write a caption..."
          ref={textRef}
        ></textarea>
        <ChoiceExerciseMenu onClick={typeClick} exercise={exercise} />
        <button
          className="w-full bg-sky-500 text-white py-2 mt-2 rounded-md"
          onClick={handleSubmit}
        >
          Publish
        </button>
      </form>
    </section>
  );
}

export default NewPost;
