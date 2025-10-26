import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const BASE_URL = "https://tripora-server.vercel.app/api";

export const useApi = () => {
  const { token } = useContext(AuthContext); // use Firebase token
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = axios.create({ baseURL: BASE_URL });

  // Add token to headers automatically
  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Global error handling
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.response?.status;

      if (status === 401) {
        // Unauthorized → redirect to login
        navigate("/login", { replace: true });
      } else if (status === 403) {
        // Forbidden → unauthorized page
        navigate("/unauthorized", { replace: true });
      }

      return Promise.reject(err);
    }
  );

  const request = async (endpoint, method, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api({ method, url: endpoint, data: body });
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    get: (endpoint) => request(endpoint, "GET"),
    post: (endpoint, body) => request(endpoint, "POST", body),
    put: (endpoint, body) => request(endpoint, "PUT", body),
    patch: (endpoint, body) => request(endpoint, "PATCH", body),
    del: (endpoint) => request(endpoint, "DELETE"),
  };
};
