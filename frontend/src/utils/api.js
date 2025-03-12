// frontend/src/utils/api.js

const API_URL = "https://backend-zeta-five-62.vercel.app"; // Ensure this is correct

export const fetchTransfers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/transfers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return [];
  }
};

export const createTransfer = async (transferData) => {
  try {
    const response = await fetch(`${API_URL}/api/transfers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transferData),
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating transfer:", error);
    return null;
  }
};

export const deleteTransfer = async (id) => {
  try {
    await fetch(`${API_URL}/api/transfers/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting transfer:", error);
  }
};
