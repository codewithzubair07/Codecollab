import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    githubUsername: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    teamSize: '',
    primaryLanguages: []
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const programmingLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' }
  ];

  const teamSizes = [
    { value: 'solo', label: 'Solo Developer' },
    { value: 'small', label: '2-5 developers' },
    { value: 'medium', label: '6-15 developers' },
    { value: 'large', label: '16+ developers' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
        />

        {/* Password Strength Indicator */}
        {formData.password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Password Strength</span>
              <span className={`text-sm font-medium ${
                passwordStrength < 25 ? 'text-error' :
                passwordStrength < 50 ? 'text-warning' :
                passwordStrength < 75 ? 'text-accent' : 'text-success'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
              />
            </div>
          </motion.div>
        )}

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <Input
          label="GitHub Username (Optional)"
          type="text"
          placeholder="Your GitHub username"
          value={formData.githubUsername}
          onChange={(e) => handleInputChange('githubUsername', e.target.value)}
          description="Connect your GitHub for seamless integration"
        />
      </div>

      {/* Advanced Options Toggle */}
      <motion.div
        className="border-t border-border pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
          <span>Advanced Options</span>
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Team Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {teamSizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => handleInputChange('teamSize', size.value)}
                    className={`p-3 rounded-lg border text-sm transition-all duration-200 ${
                      formData.teamSize === size.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Primary Programming Languages
              </label>
              <div className="grid grid-cols-2 gap-2">
                {programmingLanguages.map((lang) => (
                  <button
                    key={lang.value}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.primaryLanguages.includes(lang.value);
                      const newLanguages = isSelected
                        ? formData.primaryLanguages.filter(l => l !== lang.value)
                        : [...formData.primaryLanguages, lang.value];
                      handleInputChange('primaryLanguages', newLanguages);
                    }}
                    className={`p-2 rounded-lg border text-sm transition-all duration-200 ${
                      formData.primaryLanguages.includes(lang.value)
                        ? 'border-secondary bg-secondary/10 text-secondary' :'border-border hover:border-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Terms and Privacy */}
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
          error={errors.agreeToPrivacy}
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-6"
      >
        Create Account
      </Button>
    </motion.form>
  );
};

export default RegistrationForm;