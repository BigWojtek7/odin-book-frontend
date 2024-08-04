const getRequestWithNativeFetch = async (url, headers) => {
  const response = await fetch(url, { headers: headers });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

export default getRequestWithNativeFetch;
