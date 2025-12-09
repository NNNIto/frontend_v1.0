const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export async function getPosts() {
  try {
    const res = await fetch(`${API_BASE}/posts`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await safeJson(res);
  } catch (err) {
    console.warn('getPosts failed, falling back to empty array:', err);
    return [];
  }
}

export async function getPost(id: string) {
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await safeJson(res);
  } catch (err) {
    console.warn('getPost failed:', err);
    return null;
  }
}

export async function createPost(payload: any) {
  try {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await safeJson(res);
  } catch (err) {
    console.warn('createPost failed:', err);
    return null;
  }
}
