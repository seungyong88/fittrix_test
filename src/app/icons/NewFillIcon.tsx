import { BsPlusSquareFill } from 'react-icons/bs';

type Props = {
  size?: "small" | "medium" | "large";
  color?: string;
};

export default function NewFillIcon({ size = "small" }: Props) {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  return (
    <BsPlusSquareFill
      className={`
      ${sizeMap[size]}
    `}
    />
  );
}
