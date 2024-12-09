import { getToken } from "./sesssion";

const API_URL = 'http://localhost:3000/api/v1/'

export function rest<T>(url: string, data?: unknown, method?: string): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }).then((x) => x.json())
}

export async function restWtoken<T>(url: string, data?: unknown, method?: string): Promise<T> {
  const token = getToken(); // Retrieve the token from the session

  const options: RequestInit = {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }) // Add the Authorization header if the token exists
    },
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export function api<T>(url: string, data?: unknown, method?: string): Promise<T> {
  return restWtoken<T>(API_URL + url, data, method)
}

export function apiNoToken<T>(url: string, data?: unknown, method?: string): Promise<T> {
  return rest<T>(API_URL + url, data, method)
}