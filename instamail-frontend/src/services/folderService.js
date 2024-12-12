import api from './api'; // Assuming you have an api configuration file

export const deleteFolder = async (folderName) => {
  try {
    const response = await api.delete(`/folders/${folderName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 