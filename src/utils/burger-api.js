function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function loadData(url, options) {
  return fetch(url, options).then(checkReponse);
}

export function loadIngredients(base_url) {
  const endpoint = `${base_url}/ingredients`;
  return loadData(endpoint);
}

export function placeOrder(base_url, requestData) {
  const endpoint = `${base_url}/orders`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ ingredients: requestData }),
  };
  return loadData(endpoint, options);
}
