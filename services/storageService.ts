import { Composition, UserProfile, Instrument, Complexity } from "../types";

/**
 * MOCK SUPABASE CLIENT
 * In a real production app, this file would export the `supabase` client initialized with createClient.
 * Here, we simulate the DB latency and storage using localStorage to provide a full "SaaS" experience
 * without requiring backend infrastructure setup for the user.
 */

const KEYS = {
  SESSION: 'ariomuse_session',
  USERS: 'ariomuse_users',
  COMPOSITIONS: 'ariomuse_compositions',
};

// --- Auth ---

export const signUp = async (email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> => {
  await delay(800); // Simulate network
  
  const users = getUsersDB();
  if (users.find(u => u.email === email)) {
    return { user: null, error: "User already exists" };
  }

  const newUser: UserProfile = {
    id: crypto.randomUUID(),
    email,
    username: email.split('@')[0],
    onboardingCompleted: false,
    subscriptionTier: 'free',
    createdAt: Date.now()
  };

  users.push(newUser);
  saveUsersDB(users);
  localStorage.setItem(KEYS.SESSION, JSON.stringify(newUser));

  return { user: newUser, error: null };
};

export const signIn = async (email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> => {
  await delay(800);
  const users = getUsersDB();
  const user = users.find(u => u.email === email);
  
  // In a real app, we'd hash check password. Here we just check existence for demo.
  if (!user) return { user: null, error: "Invalid credentials" };

  localStorage.setItem(KEYS.SESSION, JSON.stringify(user));
  return { user, error: null };
};

export const signOut = async () => {
  localStorage.removeItem(KEYS.SESSION);
};

export const getSession = (): UserProfile | null => {
  const sess = localStorage.getItem(KEYS.SESSION);
  return sess ? JSON.parse(sess) : null;
};

export const updateUserProfile = async (id: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
  await delay(500);
  const users = getUsersDB();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error("User not found");

  const updated = { ...users[idx], ...updates };
  users[idx] = updated;
  saveUsersDB(users);
  
  // Update session if it's the current user
  const current = getSession();
  if (current && current.id === id) {
    localStorage.setItem(KEYS.SESSION, JSON.stringify(updated));
  }

  return updated;
};

// --- Compositions DB ---

export const getCompositions = async (userId: string): Promise<Composition[]> => {
  await delay(400); // Simulate fetch
  const all = getCompositionsDB();
  return all.filter(c => c.userId === userId).sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getCompositionById = async (id: string): Promise<Composition | null> => {
  const all = getCompositionsDB();
  return all.find(c => c.id === id) || null;
};

export const saveComposition = async (comp: Composition): Promise<void> => {
  await delay(600); // Simulate write
  const all = getCompositionsDB();
  const idx = all.findIndex(c => c.id === comp.id);
  if (idx >= 0) {
    all[idx] = comp;
  } else {
    all.push(comp);
  }
  localStorage.setItem(KEYS.COMPOSITIONS, JSON.stringify(all));
};

export const deleteComposition = async (id: string): Promise<void> => {
  const all = getCompositionsDB();
  const filtered = all.filter(c => c.id !== id);
  localStorage.setItem(KEYS.COMPOSITIONS, JSON.stringify(filtered));
};

// --- Internal Helpers ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getUsersDB = (): UserProfile[] => {
  const s = localStorage.getItem(KEYS.USERS);
  return s ? JSON.parse(s) : [];
};

const saveUsersDB = (users: UserProfile[]) => {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
};

const getCompositionsDB = (): Composition[] => {
  const s = localStorage.getItem(KEYS.COMPOSITIONS);
  return s ? JSON.parse(s) : [];
};