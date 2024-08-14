import React, { useState } from "react";
import axios from "axios";
import { createUser } from "@/utils/api";

const UserForm = () => {
  const [formData, setFormData] = useState({
    usrUsername: "",
    usrFirstname: "",
    usrLastname: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({
        token: localStorage.getItem("token"),
        payload: formData,
      });

      if (response.status === 200) {
        setSuccessMessage("User data submitted successfully!");
        setFormData({ usrUsername: "", usrFirstname: "", usrLastname: "" });
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Submit User Data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="usrUsername"
          >
            Username
          </label>
          <input
            type="text"
            id="usrUsername"
            name="usrUsername"
            value={formData.usrUsername}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="usrFirstname"
          >
            First Name
          </label>
          <input
            type="text"
            id="usrFirstname"
            name="usrFirstname"
            value={formData.usrFirstname}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="usrLastname"
          >
            Last Name
          </label>
          <input
            type="text"
            id="usrLastname"
            name="usrLastname"
            value={formData.usrLastname}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {successMessage && (
        <div className="mt-6 text-green-600 font-semibold">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default UserForm;
