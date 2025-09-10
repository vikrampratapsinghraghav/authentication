import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';
import DecorativeShape from '../components/DecorativeShape';
import { colors, typography, spacing } from '../styles/theme';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const result = await login(email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      // Navigation will be handled by the main App component
    } else {
      Alert.alert('Login Failed', result.error || 'Invalid credentials');
    }
  };

  const clearError = (field: string) => {
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <DecorativeShape />
        
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="EMAIL"
            placeholder="user123@email.com"
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
              autoComplete="password"
              icon="lock-closed-outline"
              error={errors.password}
            />
           
         

          <GradientButton
            title="LOGIN"
            onPress={handleLogin}
            loading={isLoading}
            icon="arrow-forward"
            style={styles.loginButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxxl,
    marginTop: spacing.xxl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySecondary,
  },
  form: {
    flex: 1,
  },
  passwordContainer: {
    position: 'relative',
    paddingRight: 56,
  },
  forgotButton: {
    position: 'absolute',
    right: 0,
    top: 2,
    zIndex: 1,
  },
  forgotText: {
    ...typography.label,
    color: colors.primary,
    fontSize: 11,
  },
  loginButton: {
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

export default LoginScreen;
