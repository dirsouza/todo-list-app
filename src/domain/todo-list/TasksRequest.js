import http from 'Support/services/HttpService';

class TasksRequest {
  static baseUrl() {
    return '/api/v1/tasks';
  }

  /**
   * @param {{
   *   page: int,
   *   perPage: int,
   *   search: string,
   *   archived: int,
   *   completed: int,
   * }} params
   */
  static list(params = {}) {
    return http.get(this.baseUrl(), { params });
  }

  /**
   * @param {int} id
   */
  static task(id) {
    return http.get(`${this.baseUrl()}/${id}`);
  }

  /**
   * @param {{
   *   title: string,
   *   description: string,
   *   archived: int,
   *   completed: int,
   * }} payload
   */
  static create(payload) {
    return http.post(`${this.baseUrl()}/create`, payload);
  }

  /**
   * @param {int} id
   * @param {{
   *   title: string,
   *   description: string,
   *   archived: int,
   *   completed: int,
   * }} payload
   */
  static update(id, payload) {
    return http.put(`${this.baseUrl()}/update/${id}`, payload);
  }

  /**
   * @param {int} id
   */
  static delete(id) {
    return http.delete(`${this.baseUrl()}/delete/${id}`);
  }
}

export default TasksRequest;
