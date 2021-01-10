class FetchAPI {
  constructor() {
    this.rootURL = "";
    this.jwt = "";
  }

  // Getters and Setters
  get rootUrl() {
    return this.rootURL;
  }

  set rootUrl(url) {
    this.rootURL = url;
  }

  get token() {
    return this.token;
  }

  set token(token) {
    this.jwt = token;
  }

  // Request Methods
  async post(url = "", body = {}) {
    console.log(body);
    const options = {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.jwt) {
      options.headers.Authorization = "Bearer " + this.jwt;
    }

    const response = await fetch(this.rootURL + url, options);
    const json = await response.json();

    if (json.error) {
      this.handleError(json);
    }

    return json;
  }

  async get(url = "", options = {}) {
    if (this.jwt) {
      options.headers = {
        Authorization: `Bearer ${this.jwt}`,
      };
    }

    const response = await fetch(this.rootURL + url, options);
    const json = await response.json();

    if (json.error) {
      this.handleError(json);
    }

    return json;
  }

  async delete(url = "", options = {}) {
    options = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.jwt) {
      options.headers.Authorization = "Bearer " + this.jwt;
    }

    try {
      const response = await fetch(this.rootURL + url, options);

      if (!response.ok) {
        await this.handleBadRequest(response);
      }
    } catch (error) {
      console.log(error, "testststst");
      this.handleError(error);
    }
  }

  async put(url = "", body = {}) {
    const options = {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.jwt) {
      options.headers.Authorization = "Bearer " + this.jwt;
    }

    const response = await fetch(this.rootURL + url, options);
    const json = await response.json();

    if (json.error) {
      this.handleError(json);
    }

    return json;
  }

  // Utility Functions
  createFormData(dataObject) {
    const formData = new FormData();

    Object.entries(dataObject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    for (const p of formData) {
      console.log(p);
    }
    return formData;
  }

  async handleBadRequest(response) {
    const json = await response.json();
    const message = json?.message || "bad request";

    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  handleError({ statusCode, message }) {
    let content = "";

    switch (statusCode) {
      case 500:
        content = "Oops... Something went wrong! 500";
        break;
      case 401:
      case 403:
        content = "You are not authorized. Please log in or create an account.";
        break;
      case 400:
        content = message;
        break;
    }

    throw new Error(content);
  }
}

const Fetch = new FetchAPI();

export default Fetch;
