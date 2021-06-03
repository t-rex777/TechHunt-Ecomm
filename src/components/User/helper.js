import { techHuntAPI } from "./../../utils";

export const signin = async (user) => {
  try {
    const response = await techHuntAPI.post("/signin", {
      ...user,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await techHuntAPI.get("/user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem("_rtoken") === null ) {
    return false;
  }
  return true;
};
