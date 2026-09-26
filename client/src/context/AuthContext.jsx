import { createContext, useContext, useState } from 'react';
import api from '../services/axiosClient';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('ttt_user') || 'null'));
  const save = ({ token, user }) => { localStorage.setItem('ttt_token', token); localStorage.setItem('ttt_user', JSON.stringify(user)); setUser(user); return user; };
  const login = async (email, password) => save((await api.post('/auth/login', { email, password })).data);
  const register = async (d) => save((await api.post('/auth/register', d)).data);
  const logout = () => { localStorage.removeItem('ttt_token'); localStorage.removeItem('ttt_user'); setUser(null); };
  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>;
}
