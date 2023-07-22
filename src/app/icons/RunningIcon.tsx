type Props = {
  size?: "small" | "medium" | "large";
  color?: string;
};

export default function RunningIcon({ size = "small" }: Props) {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  return (
    <img src="/images/running.png" alt="Running Icon"
      className={`
      ${sizeMap[size]}
    `}
    />
  );
}
