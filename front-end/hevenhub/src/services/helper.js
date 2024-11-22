import axios from "axios";

// Create Axios Instance
export const myAxios = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// // Export API Call Wrappers
// export const fetchAllHotels = () => {
//   return myAxios
//     .get("/api/v1/hotel/getAllHotels", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pass token from localStorage
//       },
//     })
//     .then((res) => res.data)
//     .catch((error) => {
//       console.error("Error fetching hotels:", error);
//       throw error;
//     });
// };

export const loginUser = (loginDetails) => {
  return myAxios
    .post("/api/v1/user/login", loginDetails)
    .then((res) => res.data);
};

export const registerUser = (userDetails) => {
  return myAxios
    .post("/api/v1/users/register", userDetails)
    .then((res) => res.data);
};
