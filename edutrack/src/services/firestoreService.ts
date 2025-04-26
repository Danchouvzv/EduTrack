import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  setDoc, 
  updateDoc,
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { firestore } from './firebase';
import { UserRole } from './authService';

// Get user data by user ID
export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Update user data
export const updateUserData = async (userId: string, data: Partial<DocumentData>) => {
  try {
    await updateDoc(doc(firestore, 'users', userId), data);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Get students for a parent
export const getStudentsForParent = async (parentId: string) => {
  try {
    const studentsQuery = query(
      collection(firestore, 'users'),
      where('parentId', '==', parentId),
      where('role', '==', 'student')
    );
    
    const studentsSnapshot = await getDocs(studentsQuery);
    return studentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting students for parent:', error);
    throw error;
  }
};

// Get students for a school
export const getStudentsForSchool = async (schoolId: string) => {
  try {
    const studentsQuery = query(
      collection(firestore, 'users'),
      where('schoolId', '==', schoolId),
      where('role', '==', 'student')
    );
    
    const studentsSnapshot = await getDocs(studentsQuery);
    return studentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting students for school:', error);
    throw error;
  }
};

// Interface for feedback submission
interface FeedbackData {
  userId: string;
  email: string;
  subject: string;
  message: string;
}

// Submit feedback to Firestore
export const submitFeedback = async (data: FeedbackData) => {
  try {
    const feedbackRef = collection(firestore, 'feedback');
    await addDoc(feedbackRef, {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Add other Firestore service functions as needed
export const updateUserProfile = async (userId: string, data: DocumentData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}; 