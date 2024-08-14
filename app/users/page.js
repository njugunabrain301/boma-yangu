"use client";
import Header from "@/Components/Header";
import { fetchUsers, logout, searchUsers } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const getUsers = async () => {
    let res = await fetchUsers({ token: window.localStorage.getItem("token") });
    if (res.statusCode === "200") {
      setUsers(res.payload.content);
    } else {
      logout();
      router.push("/login");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (searching) return;
    setSearching(true);
    let res = await searchUsers({
      token: window.localStorage.getItem("token"),
      payload: { usrUsername: search },
    });
    if (res.statusCode === "200") {
      setUsers(res.payload);
    } else {
      logout();
      router.push("/login");
    }
    setSearching(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Users List</h1>
        <div className="flex">
          <input
            type="text"
            id="username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px] px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search"
            required
          />{" "}
          <button
            onClick={handleSearch}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Username</th>
              <th className="py-2 px-4 bg-gray-200">First Name</th>
              <th className="py-2 px-4 bg-gray-200">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.usrId} className="border-b">
                <td className="py-2 px-4">
                  <Link
                    href={`/user/${user.usrId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {user.usrUsername}
                  </Link>
                </td>
                <td className="py-2 px-4">{user.usrFirstname}</td>
                <td className="py-2 px-4">{user.usrLastname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
