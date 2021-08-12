export const ENDPOINT_URL = {
  GET: {
    getRoomsByID: (id: string) => `/rooms/${id}`,
    getHostsByID: (id: string) => `/customer/${id}`,
    getCustomerByID: (id: string) => `/customer/${id}`,
  },
  POST: {
    login: '/auth/login',
  },
};
