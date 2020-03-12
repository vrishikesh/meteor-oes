import axios from 'axios'

export default axios.create({
  baseURL: 'https://onlinees-60003.firebaseio.com',
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
})
