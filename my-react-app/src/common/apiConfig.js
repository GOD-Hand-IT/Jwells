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
};

export default SummaryApi;
