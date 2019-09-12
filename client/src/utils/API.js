import axios from "axios";
import ls from "local-storage";

export default {
  // Gets boats from the Node server API
  getBoats: async function() {
    try {
      const boats = await axios.get("/api/boats");
      return boats;
    } catch (error) {
      console.log("error in get boats (╯°□°)╯︵ ┻━┻ ", error);
    }
  },
  getBoat: async function(id) {
    try {
      const boat = await axios.get("/api/boats/" + id);
      return boat;
    } catch (error) {
      console.log("error in get boats (╯°□°)╯︵ ┻━┻ ", error);
    }
  },
  // Deletes the saved boat with the given id
  deleteBoat: function(id) {
    return axios.delete("/api/boats/" + id);
  },
  // Saves an boat to the database
  saveBoat: function(boatData) {
    return axios.post("/api/boats", boatData);
  },
  // finds an existing user and logs them in
  userSignIn: async function(userData) {
    try {
      const user = await axios.post("/api/users/signin", userData);
      if (user) {
        ls.set("user-token", user.data.token);
        if (user.data.adminMode) {
          ls.set("admin", user.data.adminMode);
        }
        return user;
      }
    } catch (error) {
      console.log("user login error (╯°□°)╯︵ ┻━┻ ", error);
    }
  },
  userSignOut: async function() {
    ls.clear("user-token");
    return;
  },
  // creates a new user
  userCreate: async function(userData) {
    try {
      const newUser = await axios.post("/api/users/signup", userData);
      return newUser;
    } catch (error) {
      console.log("userCreate error (╯°□°)╯︵ ┻━┻ ", error);
    }
  },
  saveWhiteLabel: async function(whiteLabelData) {
    console.log("Posting to api/whitelabels");
    return axios.post("/api/whitelabels", whiteLabelData);
  },
};
