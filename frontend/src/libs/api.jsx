import axios from "axios";

const api = axios.create({ //axiosはHTTPクライアントライブラリ。awaitにより、リクエストの処理が完了するまで待機して次の行に進む
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  let token = localStorage.getItem("jwt");
  if (token && !token.startsWith("Bearer ")) token = `Bearer ${token}`;
  if (token) config.headers.Authorization = token;
  return config;
});

export default api;

// このファイルがやっていること
// baseURL を決める
// 送信前に JWT を自動で付ける
//（任意）共通エラーハンドリング