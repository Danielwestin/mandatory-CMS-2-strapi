import { STRAPI_URL } from "../library/constants";

import Fetch from "../library/fetch.js";

class CMSClient {
  constructor() {
    Fetch.rootUrl = STRAPI_URL;
  }

  // Utility functions
  setJWT(jwt) {
    Fetch.token = jwt;
  }

  // User methods
  async login(credentials) {
    return await Fetch.post("/auth/local", credentials);
  }

  async register(details) {
    return await Fetch.post("/auth/local/register", details);
  }

  // Article methods
  async articles() {
    return await Fetch.get("/articles");
  }

  // Category methods
  async categories() {
    return await Fetch.get("/categories");
  }

  async category(id) {
    return await Fetch.get("/categories/" + id);
  }

  // Products methods
  async product(id = 1) {
    return await Fetch.get("/products/" + id);
  }

  async products(query = "") {
    return await Fetch.get("/products" + query);
  }

  async productCount() {
    return await Fetch.get("/products/count");
  }

  async productPaths() {
    return await Fetch.get("/products/paths");
  }

  // Order methods
  async placeOrder(details) {
    return await Fetch.post("/orders", details);
  }
}

const CMS = new CMSClient();

export default CMS;
