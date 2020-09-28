export const config = {
  // TODO Production url
  API_URL: window.location.hostname === 'localhost' ?
      'http://localhost:5000/api/v1/messages'
      : 'production-url-messages'
}
