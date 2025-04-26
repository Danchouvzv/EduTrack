import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  User,
  UserCredential,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

export type UserRole = 'student' | 'parent' | 'school';

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData): Promise<UserCredential> => {
  try {
    // Check if email already exists
    const methods = await fetchSignInMethodsForEmail(auth, data.email);
    if (methods.length > 0) {
      // Email is already in use
      throw { code: 'auth/email-already-in-use', message: 'This email is already registered. Please use a different email or login.' };
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Update user profile
    await updateProfile(userCredential.user, {
      displayName: data.displayName,
    });
    
    // Store additional user data in Firestore
    await setDoc(doc(firestore, 'users', userCredential.user.uid), {
      displayName: data.displayName,
      email: data.email,
      role: data.role,
      createdAt: new Date().toISOString(),
    });
    
    return userCredential;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const loginUser = async (data: LoginData): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}; 