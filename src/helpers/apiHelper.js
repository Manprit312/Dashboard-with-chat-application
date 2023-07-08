export const callApi = async (url, method, body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.message || 'Something went wrong');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
