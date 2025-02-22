"use client";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "../../../public/images/note.jpg";
import Image from "next/image";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import { UserContext } from "../_context/UserContext";
import { useRouter } from "next/navigation";

const MyNavbar = () => {
  const { token, setToken } = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      <nav className="bg-[#feffff] border-gray-200 py-2 shadow-lg w-full fixed left-0 top-0">
        <div className="container flex items-center justify-between">
          <Link href="/" className="">
            <Image
              src={logo}
              width={100}
              height={100}
              className="h-14 w-16"
              alt="Flowbite Logo"
            />
          </Link>

          <div className="w-full flex justify-end">
            <ul className="font-medium flex p-2">
              {!token ? (
                <div className="flex items-center">
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center py-2 px-3 text-black/80 rounded-md hover:bg-[#f6f6f6] text-lg"
                      aria-current="page"
                    >
                      <span>Login</span>
                      <RiLoginBoxLine className="ms-1 text-xl" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="flex items-center py-2 px-3 text-black/80 rounded-md hover:bg-[#f6f6f6] text-lg"
                    >
                      <span>Register</span>
                      <LiaEditSolid className="ms-1 text-2xl" />
                    </Link>
                  </li>
                </div>
              ) : (
                <li
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    router.push("/login");
                  }}
                  className="flex items-center py-2 px-3 text-black/80 rounded-md hover:bg-[#f6f6f6] text-lg cursor-pointer"
                >
                  <span> Logout</span>
                  <RiLogoutBoxLine className="ms-1 text-xl" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MyNavbar;
