"use client";
import { logout } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState("");
  let router = useRouter();
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (!token) {
      localStorage.clear();
      router.push("/login");
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      setUsername(user.username);
    }
  }, []);

  const logoutHandler = () => {
    logout();
    localStorage.clear();
    router.push("/login");
  };
  return (
    <div className="flex justify-between p-4 w-full">
      Welcome {username}
      <ul className="flex">
        <li className="p-2">
          <Link href={"/users"}>Users</Link>
        </li>
        <li className="p-2">
          <Link href={"/createUser"}>Create User</Link>
        </li>
        <li onClick={logoutHandler} className="p-2">
          Log Out
        </li>
      </ul>
    </div>
  );
}
