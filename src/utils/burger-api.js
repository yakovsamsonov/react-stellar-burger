function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function loadData(url) {
  return fetch(url).then(checkReponse);
}

export function loadIngredients(base_url) {
  const endpoint = `${base_url}/ingredients`;
  return loadData(endpoint);
}
