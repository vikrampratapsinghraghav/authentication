import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }
      
      if (!password || password.length < 6) {
        return { success: false, error: 'Invalid password' };
      }
      
      setUser(foundUser);
      await saveUser(foundUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      
      setUser(newUser);
      await saveUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    await removeUser();
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
