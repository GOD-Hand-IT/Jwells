const backendDomain = "http://localhost:3000";

const SummaryApi = {
  category: {
    url: `${backendDomain}/product/category`,
    method: "get"
  },
  categoryProduct: {
    url: `${backendDomain}/product/`,
    method: "get"
  },
  productDetails: {
    url: `${backendDomain}/product/info/`,
    method: "get"
  },
  login: {
    url: `${backendDomain}/user/login`,
    method: "post"
  },
  logout: {
    url: `${backendDomain}/user/logout`,
    method: "post"
  },
  register: {
    url: `${backendDomain}/user/register`,
    method: "post"
  },
  userProfile: {
    url: `${backendDomain}/user`,
    method: "post"
  },
  updateProfile: {
    url: `${backendDomain}/user/update`,
    method: "put"
  },
  addToCart: {
    url: `${backendDomain}/cart/add`,
    method: "post"
  },
  removeFromCart: {
    url: `${backendDomain}/cart/remove`,
    method: "delete"
  },
  showCart: {
    url: `${backendDomain}/cart/show`,
    method: "post"
  },
  fetchOrders: {
    url: `${backendDomain}/order`,
    method: "post"
  },
  fetchProducts: {
    url: `${backendDomain}/admin/product`,
    method: "post"
  },
};

export default SummaryApi;
