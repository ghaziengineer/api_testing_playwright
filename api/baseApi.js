/*
Parent class for all API objects

It centralizes:
- HTTP methods (GET, POST, PUT, DELETE)
- Common request handling
- Default headers injection
- Future reusable logic (logging, retry, error handling, auth token)

It avoids duplication across API classes.
*/

export class BaseApi {
  constructor(request, token = null) {
    this.request = request;
    this.token = token;

    // Default headers for all requests
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Automatically inject Authorization header if token exists
    if (this.token) {
      this.defaultHeaders['Authorization'] = `Bearer ${this.token}`;
    }
  }

  // Playwright injects a request fixture
  async get(url, options = {}) {
    return await this.request.get(url, {
      headers: { ...this.defaultHeaders, ...(options.headers || {}) },
      ...options
    });
  }

  async post(url, data, options = {}) {
    return await this.request.post(url, {
      headers: { ...this.defaultHeaders, ...(options.headers || {}) },
      data,
      ...options
    });
  }

  async put(url, data, options = {}) {
    return await this.request.put(url, {
      headers: { ...this.defaultHeaders, ...(options.headers || {}) },
      data,
      ...options
    });
  }

  async delete(url, options = {}) {
    return await this.request.delete(url, {
      headers: { ...this.defaultHeaders, ...(options.headers || {}) },
      ...options
    });
  }
}