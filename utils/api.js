import axios from "./axios.config";

export const login = async (payload) => {
  try {
    let res = await axios.post("/login", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const logout = async (payload) => {
  try {
    let res = await axios.post("/logout", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchUsers = async (payload) => {
  try {
    let res = await axios.post("/listAll", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const searchUsers = async (payload) => {
  try {
    let res = await axios.post("/search", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const editUser = async (payload) => {
  try {
    let res = await axios.post("/edit", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const createUser = async (payload) => {
  try {
    let res = await axios.post("/create", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};
