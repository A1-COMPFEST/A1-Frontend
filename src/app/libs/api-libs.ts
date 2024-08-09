export const getPopularData = async (resource: string): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:8000/api/${resource}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
