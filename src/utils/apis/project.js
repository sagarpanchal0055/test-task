import axios from 'axios';

const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}projects`, projectData);

    if (response.status === 201) {
      console.log('Project created successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Project creation failed:', error);
    throw error;
  }
};

const updateProject = async (id, updatedData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}projects/${id}`, updatedData);

    if (response.status === 200) {
      console.log('Project updated successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Project update failed:', error);
    throw error;
  }
};

export {
  createProject,
  updateProject
}