import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

const parseJwt = (t) => {
  try { return JSON.parse(atob(t.split('.')[1])); } catch { return null; }
};

export default function AuthProvider({children}) {
  const [user,setUser] = useState(()=> {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = parseJwt(token);
    if (!payload || payload.exp*1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }
    return { id: payload.id, role: payload.role, email: payload.email, token };
  });

  useEffect(()=>{
    if (!user?.token) return;
    const payload = parseJwt(user.token);
    const msLeft = payload.exp*1000 - Date.now();
    const t = setTimeout(()=>{
      localStorage.removeItem('token');
      setUser(null);
      alert('หมดเวลาใช้งาน (2 ชั่วโมง) กรุณาเข้าสู่ระบบใหม่');
    }, Math.max(msLeft, 0));
    return ()=>clearTimeout(t);
  }, [user]);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setUser({ ...data.user, token: data.token });
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  return <AuthCtx.Provider value={{user,login,logout}}>{children}</AuthCtx.Provider>;
}
