import React from "react";

type Props = {
  image?: string | null;
  userType?: string;
  size?: "small" | "medium" | "large";
};

function Avatar({ image, userType = "user", size="medium" }: Props) {
  return (
    <div className={`rounded-full overflow-hidden ${size === 'medium'? 'w-9 h-9': 'w-8 h-8'}`}>
      <img 
        src={image ? image : `/images/admin.jpg`}
        className="rounded-full w-9 h-9"
          referrerPolicy="no-referrer"
        />
    </div>
  );
}

export default Avatar;
