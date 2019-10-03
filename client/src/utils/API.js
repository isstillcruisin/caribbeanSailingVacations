import axios from "axios";
import ls from "local-storage"; //MHATODO: MAKE SURE THIS IS NOT STORING THE TOKEN IN LOCAL STORAGE SHOULD BE A HTTP ONLY COOKIE.

export default {
  // Gets boats from the Node server API
  getBoats: async function({eBrochure, whiteLabel}) {
    try {
      if (whiteLabel) {
        const boats = await axios.get(`/api/whitelabels/${whiteLabel.name}/boats`);
        return boats;
      } else if (eBrochure) {
        const boats = await axios.get(`/api/ebrochures/${eBrochure._id}/boats`);
        return boats;   
      } {
        const boats = await axios.get("/api/boats");
        return boats;
      }
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
  updateBoat: function(boatData) {
    return axios.put(`/api/boats/${boatData._id}`, boatData);
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
    ls.clear("admin");
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

  createWhiteLabel: async function(whiteLabelData) {
    try {
      const whiteLabel = await axios.post("/api/whitelabels", whiteLabelData);
      return whiteLabel;
    } catch (error) {
      console.log("saveWhiteLabel error (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  saveWhiteLabel: async function(whiteLabelData) {
    try {
      const whiteLabel = await axios.post(`/api/whiteLabels/update/${whiteLabelData._id}`, whiteLabelData);
      return whiteLabel;
    } catch (error) {
      console.log("saveWhiteLabel error (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  getWhiteLabel: async function(name) {
    try {
      const whiteLabel = await axios.get("/api/whitelabels/" + name);
      return whiteLabel;
    } catch (error) {
      console.log("error in get white label (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  getAllWhiteLabels: async function() {
    try {
      const whiteLabels = await axios.get("/api/whitelabels");
      return whiteLabels;
    } catch (error) {
      console.log("error in get whiteLabels (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  charterInquiryCreate:  async function(charterInquiryData) {
    try {
      const newCharterInquiry = await axios.post("/api/charterinquiries", charterInquiryData);
      return newCharterInquiry;
    } catch (error) {
      console.log("charterInquiryCreate error (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  updateIsConfirmed: function(whiteLabel, checked) {
    console.log("Posting to api/whitelabels");
    return axios.post(`/api/whiteLabels/update/${whiteLabel._id}`, Object.assign({}, whiteLabel, {isConfirmed: checked}));
  },

  getWhiteLabelCharterInquiries:  async function(whiteLabelName) {
    try {
      const charterInquiries = await axios.get(`/api/charterinquiries/${whiteLabelName}`);
      return charterInquiries;
    } catch (error) {
      console.log("error in get whiteLabels (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  sendOrientationPacket: async function(charterInquiryId) {
    await axios.get(`/api/charterinquiries/orientation/${charterInquiryId}`);
  },

  getCurrentUser: async function() {
    try {
      const currentUser = await axios.get('/api/users/current');
      return currentUser;
    } catch (error) {
      console.log("error in get Current User ID (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  updateWhiteLabel: async function(whiteLabel) {
    return axios.post(`/api/whiteLabels/update/${whiteLabel._id}`, whiteLabel);
  },

  saveEBrochure: async function(whiteLabel, eBrochureData) {
    console.log("Posting to api/ebrochures with", whiteLabel, eBrochureData);
    return axios.post(`/api/whiteLabels/${whiteLabel._id}/ebrochures/`, eBrochureData);
  },

  getEBrochure: async function(eBrochureId) {
    try {
      const ebrochure = await axios.get(`/api/ebrochures/${eBrochureId}`);
      return ebrochure;
    } catch (error) {
      console.log("error in get EBrochure (╯°□°)╯︵ ┻━┻ ", error);
    }
  },

  updateEBrochure: async function(ebrochure) {
    return axios.post(`/api/ebrochures/update/${ebrochure._id}`, ebrochure);
  },


  setCharterInquiryConfirmed: async function(id) {
    return axios.get(`/api/charterinquiries/confirm/${id}`)
  }
};
