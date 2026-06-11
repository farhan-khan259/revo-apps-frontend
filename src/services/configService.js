import api from '../api';

export async function fetchAllConfig() {
  try {
    const { data } = await api.get('/admin/config/all');
    return data;
  } catch (err) {
    if (err.response?.status === 401) {
      return {};
    }
    throw err;
  }
}

export async function saveConfig(patch) {
  const { data } = await api.post('/admin/config', patch);
  return data;
}

export async function uploadImage(formData) {
  const { data } = await api.post('/admin/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteImage(imageId) {
  const { data } = await api.delete(`/admin/media/${imageId}`);
  return data;
}

const configService = {
  fetchAllConfig,
  saveConfig,
  uploadImage,
  deleteImage,
};

export default configService;

