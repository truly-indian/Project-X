
const errorObject = async (res) => {
  const body = await res.json();
  const error = new Error(body?.data?.error?.message || 'Error');
  error.statusCode = res.status;
  error.statusText = res.statusText;
  error.code = res.status;
  error.displayMessage = body?.data?.error?.displayMessage;
  error.meta = { message: body?.data?.error?.message };
  throw error;
};

export const validateResponse = async (resp) => {
  if (!resp.ok) throw await errorObject(resp);
  const respData = await resp.json();
  return {
    headers: resp.headers,
    data: respData.data
  };
};

export const validateTextResponse = async (resp) => {
  if (!resp.ok) return errorObject(resp);
  const respData = await resp.text();
  return {
    headers: resp.headers,
    data: respData.data
  };
};
