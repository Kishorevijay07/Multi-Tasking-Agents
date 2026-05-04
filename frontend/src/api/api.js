const BASE_URL = "http://127.0.0.1:8000";

export const sendMessage = async (message, chat_id) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, chat_id }),
  });

  return res.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};