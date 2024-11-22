const backendUrl = "http://localhost:3000";

export async function APIget(path, accessToken) {
  return fetch(backendUrl + path, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  .then(response => response.json())

}
