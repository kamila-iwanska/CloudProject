
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function APIget(path, accessToken) {
  return fetch(backendUrl + path, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  .then(response => response.json())
}
export async function APIpost(path, accessToken, body) {
  return fetch(backendUrl + path, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    })
    .then(response => response.json())
}
