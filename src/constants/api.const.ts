export const ENDPOINT_URL = {
  GET: {
    getRoomsByID: (id: string) => `/rooms/${id}`,
    getHostsByID: (id: string) => `/customer/${id}`,
    getCustomerByID: (id: string) => `/customer/${id}`,
    getOrderByCustomerID: (userid: string) => `/order/customer/${userid}`,
    getAllCity: () => '/city',
    getCityByID: (id: string) => `/city/${id}`,
  },
  POST: {
    login: '/auth/login',
    createACity: '/city',
  },
  PUT: {
    updateACity: (id: string) => `/city/${id}`,
  }
};
