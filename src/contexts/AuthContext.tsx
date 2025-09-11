"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'Σφάλμα κατά την είσοδο';
      
      switch (authError.code) {
        case 'auth/user-not-found':
          errorMessage = 'Ο χρήστης δεν βρέθηκε';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Λάθος κωδικός πρόσβασης';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Μη έγκυρο email';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Ο λογαριασμός έχει απενεργοποιηθεί';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Πάρα πολλές προσπάθειες. Δοκιμάστε ξανά αργότερα';
          break;
        default:
          errorMessage = authError.message || 'Σφάλμα κατά την είσοδο';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message || 'Σφάλμα κατά την έξοδο');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
