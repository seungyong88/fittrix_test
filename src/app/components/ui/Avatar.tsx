import React from "react";

type Props = {
  image?: string | null;
  userType?: string;
};

function Avatar({ image, userType = "user" }: Props) {
  return (
    <div className="rounded-full w-9 h-9 overflow-hidden">
      <img 
        src={`/images/${userType == "user" ? 'avatar.jpg': 'admin.jpg'}`} 
        className="rounded-full w-9 h-9"
          referrerPolicy="no-referrer"
        />
    </div>
  );
}

export default Avatar;
