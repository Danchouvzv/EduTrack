import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { loginUser, resetPassword } from '../../services/authService';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [validation, setValidation] = useState({
    email: { valid: true, message: '' },
    password: { valid: true, message: '' },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Check for saved credentials on initial load
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

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
    } else if (password.length < 6) {
      return { valid: false, message: t('validation.passwordLength') || 'Password must be at least 6 characters' };
    }
    return { valid: true, message: '' };
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (name === 'email') {
      setValidation(prev => ({
        ...prev,
        email: validateEmail(value)
      }));
    } else if (name === 'password') {
      setValidation(prev => ({
        ...prev,
        password: validatePassword(value)
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform validation before submission
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    setValidation({
      email: emailValidation,
      password: passwordValidation
    });
    
    if (!emailValidation.valid || !passwordValidation.valid) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });
      
      // Handle "Remember me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Show success message with animation
      setSuccess('Login successful! Redirecting...');
      
      // Redirect after a short delay to show the success message
      setTimeout(() => {
        // Redirect to dashboard based on user role
        // This will be handled by the AuthContext in App.tsx
        navigate('/');
      }, 1500);
      
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide more specific error messages based on error codes
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please check your email or register.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again or reset your password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later or reset your password.');
      } else {
        setError(err.message || 'Failed to login. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    // Check if email is provided
    if (!formData.email) {
      setValidation(prev => ({
        ...prev,
        email: { valid: false, message: 'Please enter your email to reset password' }
      }));
      return;
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      setValidation(prev => ({
        ...prev,
        email: emailValidation
      }));
      return;
    }
    
    try {
      // Call password reset function
      await resetPassword(formData.email);
      
      setSuccess('Password reset link has been sent to your email');
      setError(null);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
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
                Login to EduTrack
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
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
                
                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-accent focus:outline-none"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </button>
                  </div>
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
                        Password must be at least 6 characters
                      </div>
                    )}
                    {!validation.password.valid && (
                      <p id="password-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validation.password.message}
                      </p>
                    )}
                  </div>
                </motion.div>
                
                {/* Remember Me Checkbox */}
                <motion.div variants={itemVariants} className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
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
                        Logging in...
                      </span>
                    ) : 'Login'}
                  </motion.button>
                </motion.div>
              </div>
            </form>
            
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-primary hover:text-accent">
                  Sign up
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

export default Login; 