import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getUserData } from '../services/firestoreService';
import { UserRole } from '../services/authService';

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole | null;
  userDisplayName: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: null,
  userDisplayName: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: initializing');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('AuthProvider: auth state changed', user ? 'user exists' : 'no user');
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get additional user data from Firestore
          const userData = await getUserData(user.uid);
          setUserRole(userData?.role as UserRole || null);
          setUserDisplayName(user.displayName || userData?.displayName || null);
        } catch (error) {
          console.error('Failed to get user data:', error);
        }
      } else {
        setUserRole(null);
        setUserDisplayName(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userDisplayName,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 