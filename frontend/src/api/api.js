const API_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function fetchWithAuth(url, options = {}) {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    // If backend is down, fetch throws a network error (TypeError)
    // If backend returns 401, response.ok is false

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (err) {
    // Network error (backend down) or HTTP error
    if (err.name === "TypeError" || err.message.includes("Failed to fetch")) {
      throw new Error("Cannot connect to server. Please try again.");
    }
    throw err;
  }
}

// Auth
export const register = (data) =>
  fetchWithAuth("/auth/register", { method: "POST", body: JSON.stringify(data) });

export const login = (data) =>
  fetchWithAuth("/auth/login", { method: "POST", body: JSON.stringify(data) });

// Groups
export const getGroups = () => fetchWithAuth("/groups");

// Expenses
export const getExpenses = () => fetchWithAuth("/expenses");

// Settlements
export const getSettlements = () => fetchWithAuth("/settlements");