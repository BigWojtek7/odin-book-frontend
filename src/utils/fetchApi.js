const requestWithNativeFetch = async (
  url,
  method,
  headers,
  data = undefined
) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  });
  return response.json();
};

export default requestWithNativeFetch;
