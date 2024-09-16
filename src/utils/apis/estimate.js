import axios from 'axios';

const addEstimate = async (estimateData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}estimates`, estimateData);

    if (response.status === 201) {
      console.log('Estimate added successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Estimate addition failed:', error);
    throw error;
  }
};

const updateEstimate = async (estimateId, estimateData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}estimates/${estimateId}`, estimateData);

    if (response.status === 200) {
      console.log('Estimate updated successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Estimate update failed:', error);
    throw error;
  }
};


export {
  addEstimate,
  updateEstimate
}