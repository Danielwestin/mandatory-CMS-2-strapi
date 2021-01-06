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

  handleError({ statusCode, message }) {
    let content = "";

    switch (statusCode) {
      case 500:
        content = "Oops... Something went wrong!";
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
