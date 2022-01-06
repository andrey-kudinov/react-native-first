export class Http {
  static HEADERS = { 'Content-Type': 'application/json' }

  static async get(url) {
    try {
      return await request(url)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async post(url, data = {}) {
    try {
      return await request(url, 'POST')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async delete(url) {
    try {
      return await request(url, 'DELETE')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async patch(url, data = {}) {
    try {
      return await request(url, 'PATCH')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

async function request(url, method = 'GET') {
  const config = {
    method,
    headers: Http.HEADERS
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(url, config),
    data = await response.json()

  return data
}
