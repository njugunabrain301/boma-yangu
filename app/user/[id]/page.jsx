"use client";
import Header from "@/Components/Header";
import { editUser, fetchUsers, logout } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const User = ({ params }) => {
  const router = useRouter();
  var id = params["id"];
  const getUser = async () => {
    let res = await fetchUsers({ token: window.localStorage.getItem("token") });

    if (res.statusCode === "200") {
      let users = res.payload.content.filter((usr) => usr.usrId == id);
      setUser(users[0]);
    } else {
      logout();
      router.push("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [user, setUser] = useState({});
  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [editingField]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    setEditingField(null);
    let res = await editUser({
      token: localStorage.getItem("token"),
      payload: user,
    });
    if (res.success) {
      alert("User Successfully Modified");
    } else {
      logout();
      router.push("/login");
    }
  };

  const renderField = (label, field) => (
    <div className="flex justify-between items-center my-4">
      <label className="text-gray-700 font-semibold">{label}</label>
      {editingField === field ? (
        <input
          type="text"
          value={user[field]}
          onChange={handleInputChange}
          className="ml-4 p-2 border border-gray-300 rounded-md"
        />
      ) : (
        <span className="ml-4">{user[field]}</span>
      )}
      <button
        onClick={() => handleEditClick(field)}
        className="ml-4 text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Details</h2>

        {renderField("First Name", "usrFirstname")}
        {renderField("Last Name", "usrLastname")}
        {renderField("Username", "usrUsername")}

        {editingField && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
