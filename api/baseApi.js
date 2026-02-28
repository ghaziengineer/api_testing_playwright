/*
Parent class for all API objects

It centralizes:
HTTP methods (GET, POST, PUT, DELETE)

Common request handling

Future reusable logic (headers, logging, retry, error handling)

It avoids duplication across API classes.
*/


export class BaseApi {
  constructor(request) {
    this.request = request;
  }
    //Playwright injects a request fixture
  async get(url, options = {}) {
    return await this.request.get(url, options);
  }

  async post(url, data, options = {}) {
    return await this.request.post(url, { data, ...options });
  }

  async put(url, data, options = {}) {
    return await this.request.put(url, { data, ...options });
  }

  async delete(url, options = {}) {
    return await this.request.delete(url, options);
  }
}