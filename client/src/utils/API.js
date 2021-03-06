import axios from 'axios'
import ls from 'local-storage' //MHATODO: MAKE SURE THIS IS NOT STORING THE TOKEN IN LOCAL STORAGE SHOULD BE A HTTP ONLY COOKIE.

export default {
  // Gets boats from the Node server API
  getBoats: async function({eBrochure}) {
    try {
      if (eBrochure) {
        const boats = await axios.get(`/api/ebrochures/${eBrochure._id}/boats`)
        return boats   
      } {
        const boats = await axios.get('/api/boats')
        return boats
      }
    } catch (error) {
      console.error('error in get boats (╯°□°)╯︵ ┻━┻ ', error)
    }
  },
  getBoat: async function(id) {
    try {
      const boat = await axios.get('/api/boats/' + id)
      return boat
    } catch (error) {
      console.error('error in get boats (╯°□°)╯︵ ┻━┻ ', error)
    }
  },
  // Deletes the saved boat with the given id
  deleteBoat: function(id) {
    return axios.delete('/api/boats/' + id)
  },
  // Saves an boat to the database
  saveBoat: function(boatData) {
    return axios.post('/api/boats', boatData)
  },
  updateBoat: function(boatData) {
    return axios.put(`/api/boats/${boatData._id}`, boatData)
  },
 
  getUnavailableDateRanges: async function(id) {
    try {
      const rangesResult = await axios.get(`/api/boats/unavailable/${id}`)
      return rangesResult.data.map(this._convertDateRangeToDates)
    } catch (error) {
      console.error('Error in get getUnavailableDateRanges (╯°□°)╯︵ ┻━┻ ', error)
    }
  },
  addUnavailableDateRange: async function(yacht, range) {
    try {
      const rangesResult = await axios.post(`/api/boats/unavailable/${yacht._id}`, range)
      return rangesResult.data.map(this._convertDateRangeToDates)
    } catch (error) {
      console.error('Error in get getUnavailableDateRanges (╯°□°)╯︵ ┻━┻ ', error)
    }
  },
  deleteUnavailableDateRange: async function(yacht, range) {
    try {
      const rangesResult = await axios.post(`/api/boats/unavailable/${yacht._id}/delete`, range)
      return rangesResult.data.map(this._convertDateRangeToDates)
    } catch (error) {
      console.error('Error in get getUnavailableDateRanges (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  refreshAllYachtAvailability: async function() {
    try {
      const rangesResult = await axios.get('/api/boats/refreshavailability')
      return rangesResult.data
    } catch (error) {
      console.error('Error in get refreshAllYachtAvailability (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  refreshAvailability: async function(yacht) {
    try {
      const rangesResult = await axios.get(`/api/boats/unavailable/${yacht._id}/refresh`)
      return rangesResult.data.map(this._convertDateRangeToDates)
    } catch (error) {
      console.error('Error in get refreshAvailability (╯°□°)╯︵ ┻━┻ ', error)
    }
  },
  userSignIn: async function(userData) {
    try {
      const res = await axios.post('/api/users/signin', userData)
      if (res && res.data) {
        ls.set('user-token', res.data.token)
        if (res.data.adminMode) {
          ls.set('admin', res.data.adminMode)
        }
        return res
      } else {
        return { message: res.message}
      }
    } catch (error) {
      console.error('user sign-n error (╯°□°)╯︵ ┻━┻ ', error)
      return { error: error}
    }
  },
  userSignOut: async function() {
    ls.clear('user-token')
    ls.clear('admin')
    return
  },
  // creates a new user
  userCreate: async function(userData) {
    try {
      const newUser = await axios.post('/api/users/signup', userData)
      return newUser
    } catch (error) {
      console.error('userCreate error (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  createWhiteLabel: async function(whiteLabelData) {
    try {
      const whiteLabel = await axios.post('/api/whitelabels', whiteLabelData)
      return whiteLabel
    } catch (error) {
      console.error('saveWhiteLabel error (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  saveWhiteLabel: async function(whiteLabelData) {
    try {
      const whiteLabel = await axios.post(`/api/whiteLabels/update/${whiteLabelData._id}`, whiteLabelData)
      return whiteLabel
    } catch (error) {
      console.error('saveWhiteLabel error (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  getWhiteLabel: async function(name) {
    try {
      const whiteLabel = await axios.get('/api/whitelabels/' + name)
      return whiteLabel
    } catch (error) {
      console.error('error in get white label (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  getAllWhiteLabels: async function() {
    try {
      const whiteLabels = await axios.get('/api/whitelabels')
      return whiteLabels
    } catch (error) {
      console.error('error in get whiteLabels (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  getMyWhiteLabels: async function() {
    try {
      const whiteLabels = await axios.get('/api/whitelabels/forcurrentuser')
      return whiteLabels
    } catch (error) {
      console.error('error in get mywhiteLabels (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  charterInquiryCreate:  async function(charterInquiryData) {
    try {
      const newCharterInquiry = await axios.post('/api/charterinquiries', charterInquiryData)
      return newCharterInquiry
    } catch (error) {
      console.error('charterInquiryCreate error (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  updateIsConfirmed: function(whiteLabel, checked) {
    return axios.post(`/api/whiteLabels/update/${whiteLabel._id}`, Object.assign({}, whiteLabel, {isConfirmed: checked}))
  },

  getWhiteLabelCharterInquiries:  async function(whiteLabelName) {
    try {
      const charterInquiries = await axios.get(`/api/charterinquiries/${whiteLabelName}`)
      return charterInquiries
    } catch (error) {
      console.error('error in get whiteLabels (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  sendOrientationPacket: async function(charterInquiryId) {
    await axios.get(`/api/charterinquiries/orientation/${charterInquiryId}`)
  },

  getCurrentUser: async function() {
    try {
      const currentUser = await axios.get('/api/users/current')
      return currentUser
    } catch (error) {
      console.error('error in get Current User ID (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  updateWhiteLabel: async function(whiteLabel) {
    return axios.post(`/api/whiteLabels/update/${whiteLabel._id}`, whiteLabel)
  },

  saveEBrochure: async function(whiteLabel, eBrochureData) {
    return axios.post(`/api/whiteLabels/${whiteLabel._id}/ebrochures/`, eBrochureData)
  },

  getEBrochure: async function(eBrochureId) {
    try {
      const ebrochure = await axios.get(`/api/ebrochures/${eBrochureId}`)
      return ebrochure
    } catch (error) {
      console.error('error in get EBrochure (╯°□°)╯︵ ┻━┻ ', error)
    }
  },

  updateEBrochure: async function(eBrochure) {
    //JSON.stringify the array of yachts to work around an issue found while writing tests:
    let newEBrochure = Object.assign({}, eBrochure, { yachts: JSON.stringify(eBrochure.yachts) })
    return axios.post(`/api/ebrochures/update/${eBrochure._id}`, newEBrochure)
  },

  setCharterInquiryConfirmed: async function(id) {
    return axios.get(`/api/charterinquiries/confirm/${id}`)
  },

  resetPasswordEmail: async function(email) {
    return axios.post('/api/users/resetpasswordemail', {email: email})
  },

  setNewPassword: async function(password, token) {
    return axios.post('/api/users/resetpassword', {password: password, token: token})
  },

  updateUser: async function(user) {
    return axios.post('/api/users/update', user)
  },

  sendContact: async function(eBrochure, contact) {
    return axios.post(`/api/whiteLabels/${eBrochure._whiteLabel._id}/contact`, contact)
  },

  sendEBrochure: async function(eBrochure,  recipient) {
    return axios.post(`/api/ebrochures/send/${eBrochure._id}`, recipient)
  },

  findAvailableYachts: async function(eBrochure, filters) {
    return axios.post(`/api/ebrochures/${eBrochure._id}/available`, filters)
  },

  //PRIVATE
  _convertDateRangeToDates: function(range) {
    return { from: new Date(range.from), to: new Date(range.to), description: range.description, type: range.type }
  },
}
