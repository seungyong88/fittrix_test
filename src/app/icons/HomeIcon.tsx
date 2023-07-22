import { AiOutlineHome } from "react-icons/ai";

type Props = {
  size?: "small" | "medium" | "large";
  color?: string;
};

export default function HomeIcon({ size = "small" }: Props) {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  return (
    <AiOutlineHome
      className={`
      ${sizeMap[size]}
    `}
    />
  );
}
