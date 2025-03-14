const API_URL =
  process.env.REACT_APP_API_URL || "https://backend-sepia-eight-78.vercel.app/";

export const fetchTransfers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/transfers`);
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
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating transfer:", error);
    return null;
  }
};

export const deleteTransfer = async (id) => {
  try {
    await fetch(`${API_URL}/api/transfers/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting transfer:", error);
  }
};
