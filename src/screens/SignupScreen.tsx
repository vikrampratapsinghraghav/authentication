import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validateName, validatePasswordStrength } from '../utils/validation';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';
import DecorativeShape from '../components/DecorativeShape';
import { colors, typography, spacing, shadows } from '../styles/theme';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const { signup } = useAuth();

  const passwordStrength = validatePasswordStrength(password);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

    // Validate name
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Validate password
    const passwordValidation = validatePassword(password, true); // Require strong password
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const result = await signup(name.trim(), email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      // Navigation will be handled by the main App component
    } else {
      Alert.alert('Signup Failed', result.error || 'Failed to create account');
    }
  };

  const clearError = (field: string) => {
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return colors.error;
    if (score <= 3) return colors.warning;
    if (score <= 4) return colors.info;
    return colors.success;
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <DecorativeShape />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          <View style={styles.form}>
            <InputField
              label="FULL NAME"
              placeholder="Jhone williams"
              value={name}
              onChangeText={(text) => {
                setName(text);
                clearError('name');
              }}
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              icon="person-outline"
              error={errors.name}
            />

            <InputField
              label="EMAIL"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                clearError('email');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              icon="mail-outline"
              error={errors.email}
            />

            <InputField
              label="PASSWORD"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                clearError('password');
              }}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              icon="lock-closed-outline"
              secureToggle
              error={errors.password}
            />

            {password.length > 0 && (
              <View style={styles.passwordStrengthContainer}>
                <View style={styles.passwordStrengthBar}>
                  <View 
                    style={[
                      styles.passwordStrengthFill, 
                      { 
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor(passwordStrength.score)
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.passwordStrengthText, { color: getPasswordStrengthColor(passwordStrength.score) }]}>
                  {getPasswordStrengthText(passwordStrength.score)}
                </Text>
              </View>
            )}

            <InputField
              label="CONFIRM PASSWORD"
              placeholder="Confirm your password"
              secureToggle
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                clearError('confirmPassword');
              }}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              icon="lock-closed-outline"
              error={errors.confirmPassword}
            />

            <GradientButton
              title="SIGN UP"
              onPress={handleSignup}
              loading={isLoading}
              icon="arrow-forward"
              style={styles.signupButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have a account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.xl,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  header: {
    marginBottom: spacing.xxxl,
    marginTop: spacing.xxxl,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
  },
  form: {
    flex: 1,
  },
  passwordStrengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -spacing.md,
    marginBottom: spacing.lg,
  },
  passwordStrengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  signupButton: {
    marginTop: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.bodySecondary,
  },
  footerLink: {
    ...typography.link,
  },
});

export default SignupScreen;
