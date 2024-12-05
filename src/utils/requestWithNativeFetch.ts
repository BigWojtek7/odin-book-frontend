const requestWithNativeFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        status: response.status,
        msg: errorData?.msg || 'Something went wrong',
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return {
      success: false,
      status: 500,
      msg: err.message || 'network error',
    };
  }
};

export default requestWithNativeFetch;
