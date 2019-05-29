import request from "../utils/request"

export default {
  VerifyAdmin(data, success) {
    request({
      url: '/AdminLogin',
      method: 'post',
      data: data
    }.then(success))
  },

}

