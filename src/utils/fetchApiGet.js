const getRequestWithNativeFetch = async (url, headers) => {
  const response = await fetch(url, { headers: headers });
 console.log(await response.json())
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

export default getRequestWithNativeFetch;
