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
  register: {
    url: `${backendDomain}/user/register`,
    method: "post"
  },
  addToCart: {
    url: `${backendDomain}/cart/add`,
    method: "post"
  },
  showCart: {
    url: `${backendDomain}/cart/show`,
    method: "get"
  },
};

export default SummaryApi;
