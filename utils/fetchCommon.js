import fetch from "node-fetch";

const authorization = { 'Content-Type': 'application/json' };

function fetchCommon({ url, body, method = "GET", headers = {} }) {
  const headersJson = { ...headers, ...authorization };

  return fetch(url, {
    headers: headersJson,
    body,
    method
  });
}

export function parseToken(token) {
  return { 'Authorization': `Bearer ${token}` };
}

export default fetchCommon;
