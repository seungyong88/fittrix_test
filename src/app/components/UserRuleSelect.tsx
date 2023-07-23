'use client';

import React from "react";
type Props = {
  user: any;
  update: any;
  onControlModal: any
};

function UserRuleSelect({ user, update, onControlModal }: Props) {
  const fetchUserRule = async (role: string) => {
    const res = await fetch("/api/role?role=" + role);
    const data = await res.json();
    update({ userType: data.userType });
    onControlModal("userRoleModal", false);
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center w-40 h-40 rounded-md">
      <button
        className="w-24 border p-2 rounded-md"
        onClick={() => fetchUserRule("admin")}
      >
        admin
      </button>
      <button
        className="w-24 border p-2 m-2 rounded-md"
        onClick={() => fetchUserRule("user")}
      >
        user
      </button>
    </div>
  );
}

export default UserRuleSelect;
