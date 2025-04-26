import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { registerUser, UserRole } from '../../services/authService';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
  });
  
  const [validation, setValidation] = useState({
    displayName: { valid: true, message: '' },
    email: { valid: true, message: '' },
    password: { valid: true, message: '' },
    confirmPassword: { valid: true, message: '' },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-3 strength rating
  
  const validateDisplayName = (name: string) => {
    if (!name) {
      return { valid: false, message: t('validation.nameRequired') || 'Full name is required' };
    } else if (name.length < 2) {
      return { valid: false, message: t('validation.nameLength') || 'Name must be at least 2 characters' };
    }
    return { valid: true, message: '' };
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { valid: false, message: t('validation.emailRequired') || 'Email is required' };
    } else if (!emailRegex.test(email)) {
      return { valid: false, message: t('validation.emailInvalid') || 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return { valid: false, message: t('validation.passwordRequired') || 'Password is required' };
    }
    
    // Update password strength
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
    
    if (password.length < 6) {
      return { valid: false, message: t('validation.passwordLength') || 'Password must be at least 6 characters' };
    }
    
    return { valid: true, message: '' };
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      return { valid: false, message: t('validation.confirmPasswordRequired') || 'Please confirm your password' };
    } else if (password !== confirmPassword) {
      return { valid: false, message: t('validation.passwordMatch') || 'Passwords do not match' };
    }
    return { valid: true, message: '' };
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (name === 'displayName') {
      setValidation(prev => ({
        ...prev,
        displayName: validateDisplayName(value)
      }));
    } else if (name === 'email') {
      setValidation(prev => ({
        ...prev,
        email: validateEmail(value)
      }));
    } else if (name === 'password') {
      const passwordValidation = validatePassword(value);
      const confirmPasswordValidation = validateConfirmPassword(
        value, 
        formData.confirmPassword
      );
      
      setValidation(prev => ({
        ...prev,
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation
      }));
    } else if (name === 'confirmPassword') {
      setValidation(prev => ({
        ...prev,
        confirmPassword: validateConfirmPassword(formData.password, value)
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform validation before submission
    const displayNameValidation = validateDisplayName(formData.displayName);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(
      formData.password, 
      formData.confirmPassword
    );
    
    setValidation({
      displayName: displayNameValidation,
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation
    });
    
    if (!displayNameValidation.valid || 
        !emailValidation.valid || 
        !passwordValidation.valid || 
        !confirmPasswordValidation.valid) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await registerUser({
        displayName: formData.displayName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      
      // Show success message
      setSuccess('Registration successful! Redirecting to login...');
      
      // Clear form data
      setFormData({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
      });
      
      // Redirect after a delay to show success message
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
      
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Provide more specific error messages based on error codes
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email or login.');
        setValidation(prev => ({
          ...prev,
          email: { valid: false, message: 'Email already in use' }
        }));
      } else if (err.code === 'auth/weak-password') {
        setError('Please use a stronger password.');
        setValidation(prev => ({
          ...prev,
          password: { valid: false, message: 'Password is too weak' }
        }));
      } else {
        setError(err.message || 'Failed to register. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Password strength indicator colors and labels
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <motion.div 
          className="w-full max-w-md px-6"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.div 
            className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-8"
            variants={itemVariants}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create an Account
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Join EduTrack to start your learning journey
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm focus:ring-primary bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 ${
                        !validation.displayName.valid 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary'
                      }`}
                      onFocus={() => setShowTooltip('displayName')}
                      onBlur={() => setShowTooltip(null)}
                      aria-invalid={!validation.displayName.valid}
                      aria-describedby="displayName-error"
                      required
                    />
                    {showTooltip === 'displayName' && (
                      <div className="absolute left-0 -bottom-1 transform translate-y-full z-10 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                        Enter your full name
                      </div>
                    )}
                    {!validation.displayName.valid && (
                      <p id="displayName-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validation.displayName.message}
                      </p>
                    )}
                  </div>
                </motion.div>
                
                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm focus:ring-primary bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 ${
                        !validation.email.valid 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary'
                      }`}
                      onFocus={() => setShowTooltip('email')}
                      onBlur={() => setShowTooltip(null)}
                      aria-invalid={!validation.email.valid}
                      aria-describedby="email-error"
                      required
                    />
                    {showTooltip === 'email' && (
                      <div className="absolute left-0 -bottom-1 transform translate-y-full z-10 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                        Enter a valid email address (e.g., user@example.com)
                      </div>
                    )}
                    {!validation.email.valid && (
                      <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validation.email.message}
                      </p>
                    )}
                  </div>
                </motion.div>
                
                {/* Role Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    I am a
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100"
                      onFocus={() => setShowTooltip('role')}
                      onBlur={() => setShowTooltip(null)}
                      required
                    >
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="school">School Representative</option>
                    </select>
                    {showTooltip === 'role' && (
                      <div className="absolute left-0 -bottom-1 transform translate-y-full z-10 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                        Select your role in the educational process
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm focus:ring-primary bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 ${
                        !validation.password.valid 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary'
                      }`}
                      onFocus={() => setShowTooltip('password')}
                      onBlur={() => setShowTooltip(null)}
                      aria-invalid={!validation.password.valid}
                      aria-describedby="password-error"
                      required
                    />
                    {showTooltip === 'password' && (
                      <div className="absolute left-0 -bottom-1 transform translate-y-full z-10 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                        Password must be at least 6 characters. For stronger security, include uppercase letters, numbers, and special characters.
                      </div>
                    )}
                    {!validation.password.valid && (
                      <p id="password-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validation.password.message}
                      </p>
                    )}
                    
                    {/* Password strength indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-full ${i < passwordStrength ? strengthColors[i] : 'bg-gray-300'}`}
                                style={{ width: '25%' }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-right text-gray-600 dark:text-gray-400">
                          {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Too weak'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Confirm Password Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm focus:ring-primary bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 ${
                        !validation.confirmPassword.valid 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary'
                      }`}
                      onFocus={() => setShowTooltip('confirmPassword')}
                      onBlur={() => setShowTooltip(null)}
                      aria-invalid={!validation.confirmPassword.valid}
                      aria-describedby="confirmPassword-error"
                      required
                    />
                    {showTooltip === 'confirmPassword' && (
                      <div className="absolute left-0 -bottom-1 transform translate-y-full z-10 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                        Re-enter your password to confirm
                      </div>
                    )}
                    {!validation.confirmPassword.valid && (
                      <p id="confirmPassword-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validation.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </motion.div>
                
                {/* Error Message */}
                {error && (
                  <motion.div
                    className="p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                {/* Success Message */}
                {success && (
                  <motion.div
                    className="p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {success}
                  </motion.div>
                )}
                
                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="w-full btn btn-primary py-3"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : 'Sign Up'}
                  </motion.button>
                </motion.div>
              </div>
            </form>
            
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-primary hover:text-accent">
                  Login
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register; 