"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "/public/images/logo.svg";
import HomeIcon from "../icons/HomeIcon";
import HomeFillIcon from "../icons/HomeFillIcon";
import SearchIcon from "../icons/SearchIcon";
import SearchFillIcon from "../icons/SearchFillIcon";
import NewIcon from "../icons/NewIcon";
import NewFillIcon from "../icons/NewFillIcon";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";
import {
  useSession,
  signIn,
  signOut,
  SessionContextValue,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalPortal from "./ui/ModalPortal";
import DefaultModal from "./DefaultModal";
import UserRuleSelect from "./UserRuleSelect";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { controlModal } from "@/features/modal/modalSlice";
import { Session } from "next-auth";
import Avatar from "./ui/Avatar";

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  // {
  //   href: "/search",
  //   icon: <SearchIcon />,
  //   clickedIcon: <SearchFillIcon />,
  // },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];


function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const {
    data: session,
    status,
    update,
  }: { data: Session | null; status: string; update: Function } = useSession();
  const user = session?.user;
  const dispatch = useAppDispatch();
  const { userRoleModal } = useAppSelector((state) => state.modal);

  const onControlModal = (name: string, value: boolean) => {
    dispatch(controlModal({ name, value }));
  };

  useEffect(() => {
    if (
      status !== "loading" &&
      session == undefined &&
      pathName !== "/auth/signin"
    ) {
      router.push("/auth/signin");
    }

    if (status == "authenticated") {
      if (session?.user.userType == "") {
        onControlModal("userRoleModal", true);
      }

      if (session?.user.userType !== "") {
        onControlModal("userRoleModal", false);
      }
    }

    // if(session && pathName === "/auth/signin") {
    //   router.push("/");
    // }
  }, [pathName, status, session]);

  return (
    <>
      <nav
        className={`${
          pathName === "/auth/signin" ? "hidden" : "flex"
        } justify-between items-center px-6 h-[70px]`}
      >
        <div className="w-[100px] h-[50px] min-w-[100px]">
          <Link href="/">
            <img src='/images/logo.png' alt="Logo" width={100} height={50} />
          </Link>
        </div>
        <ul className="flex gap-4 items-center p-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {session && (
            <li className="text-gray-500 flex flex-col justify-center items-center">
              <span>{user?.username}</span>
              <span className="text-xs -mt-2">{user?.userType}</span>
            </li>
          )}
          {session && (
            <li>
              <Avatar image={user?.url} userType={user?.userType} />
            </li>
          )}
          {session && <ColorButton text="Sign out" onClick={() => signOut()} />}
        </ul>
      </nav>
      {session && userRoleModal && (
        <ModalPortal>
          <DefaultModal
            onClose={() => onControlModal("userRoleModal", false)}
            openModal={userRoleModal}
          >
            <UserRuleSelect
              user={user}
              update={update}
              onControlModal={onControlModal}
            />
          </DefaultModal>
        </ModalPortal>
      )}
    </>
  );
}

export default Navbar;
