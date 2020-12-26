function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

class CMSClient {
  CMS_ROOT = "http://localhost:1337";
  JWT = "";

  setJWT(jwt) {
    this.JWT = jwt;
  }

  async get(url = "") {
    const response = await fetch(this.CMS_ROOT + url);

    if (!response.ok) {
      const { data } = await response.json();
      throw new Error(data[0].messages[0].message);
    }

    return await response.json();
  }

  async post(url = "", body = {}) {
    const response = await fetch(this.CMS_ROOT + url, {
      method: "post",
      body: objectToFormData(body),
    });

    if (!response.ok) {
      const { data } = await response.json();
      throw new Error(data[0].messages[0].message);
    }

    return await response.json();
  }

  // Authentication methods
  async login(credentials) {
    const user = await this.post("/auth/local", credentials);
    return user;
  }

  async register(details) {
    const user = await this.post("/auth/local/register", details);
    return user;
  }

  async categories() {
    return await this.get("/categories");
  }

  async category(id) {
    return await this.get(`/categories/${id}`);
  }
}

const CMS = new CMSClient();

export default CMS;
