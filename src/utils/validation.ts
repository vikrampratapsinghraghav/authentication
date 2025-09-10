// Email validation regex - RFC 5322 compliant
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Name validation regex - allows letters, spaces, hyphens, and apostrophes
export const NAME_REGEX = /^[a-zA-Z\s\-']{2,50}$/;

// Password strength validation regex
// At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Basic password validation - at least 6 characters
export const BASIC_PASSWORD_REGEX = /^.{6,}$/;

// Phone number validation (optional)
export const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Username validation (alphanumeric and underscores only)
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' };
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  if (email.length > 254) {
    return { isValid: false, message: 'Email address is too long' };
  }

  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: 'Name is required' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }

  if (trimmedName.length > 50) {
    return { isValid: false, message: 'Name must be less than 50 characters' };
  }

  if (!NAME_REGEX.test(trimmedName)) {
    return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string, requireStrong: boolean = false): ValidationResult => {
  if (!password || password === '') {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }

  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long' };
  }

  if (requireStrong) {
    if (!STRONG_PASSWORD_REGEX.test(password)) {
      return { 
        isValid: false, 
        message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character' 
      };
    }
  } else {
    if (!BASIC_PASSWORD_REGEX.test(password)) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
  }

  return { isValid: true };
};

export const validatePasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One lowercase letter');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One uppercase letter');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('One number');
  }

  if (/[@$!%*?&]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One special character (@$!%*?&)');
  }

  return { score, feedback };
};

export const validateForm = (fields: Record<string, any>): ValidationResult => {
  for (const [fieldName, value] of Object.entries(fields)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { isValid: false, message: `${fieldName} is required` };
    }
  }
  return { isValid: true };
};
