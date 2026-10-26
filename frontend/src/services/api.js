import axios from 'axios';

const API_BASE = '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const diseaseApi = {
  // Health check
  checkHealth: async () => {
    const response = await apiClient.get('/health/');
    return response.data;
  },

  // Diabetes Prediction
  predictDiabetes: async (payload) => {
    const response = await apiClient.post('/predict/diabetes/', payload);
    return response.data;
  },

  // Heart Disease Prediction
  predictHeart: async (payload) => {
    const response = await apiClient.post('/predict/heart/', payload);
    return response.data;
  },

  // Chronic Kidney Disease Prediction
  predictKidney: async (payload) => {
    const response = await apiClient.post('/predict/kidney/', payload);
    return response.data;
  },

  // Multi-Symptom Disease Prediction
  predictSymptoms: async (symptomsList) => {
    const response = await apiClient.post('/predict/symptoms/', { symptoms: symptomsList });
    return response.data;
  },

  // Fetch standardized clinical symptoms vocabulary
  getSymptoms: async () => {
    const response = await apiClient.get('/symptoms/');
    return response.data;
  },
};

export default diseaseApi;

