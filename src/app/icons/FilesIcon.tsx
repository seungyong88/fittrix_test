import { FaPhotoVideo } from "react-icons/fa";

type Props = {
  size?: "small" | "medium" | "large";
  color?: string;
};

export default function FilesIcon({ size = "small" }: Props) {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  return (
    <FaPhotoVideo
      className={`
      ${sizeMap[size]}
    `}
    />
  );
}
