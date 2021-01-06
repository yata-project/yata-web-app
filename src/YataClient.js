let jwt = null;
export function setAuthToken(token) {
  jwt = token;
}

export async function GetItems(listID) {
  return call("/lists/" + listID + "/items", "GET");
}

export async function GetLists() {
  return call("/lists", "GET");
}

export async function DescribeList(listID) {
  return call("/lists/" + listID + "/", "GET");
}

async function call(endpoint, method) {
  return fetch(endpoint, {
    method: method,
    headers: {
      Authorization: getAuthHeader(),
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    // TODO: decode the body as json and then use Code and Message from error struct
    throw new HttpResponseError(response.status, response.statusText);
  });
}

function getAuthHeader() {
  if (jwt === null) {
    throw new HttpResponseError(
      new Response(new Blob(), {
        status: 403,
        statusText: "User is not authenticated",
      })
    );
  }
  return "Bearer " + jwt;
}

export class HttpResponseError extends Error {
  constructor(code, message) {
    super(message);
    this.name = code;
    this.message = message;
  }
}
