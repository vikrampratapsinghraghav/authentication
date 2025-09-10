import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: string;
  containerStyle?: any;
  secureToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  icon,
  containerStyle,
  style,
  secureTextEntry,
  secureToggle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const computedSecure = secureTextEntry ? !(secureToggle && isPasswordVisible) : false;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputFocused,
        error && styles.inputError
      ]}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.textLight}
          {...rest}
          secureTextEntry={computedSecure}
        />
        {secureTextEntry && secureToggle && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(prev => !prev)}
            accessibilityRole="button"
            accessibilityLabel="Toggle password visibility"
            style={styles.rightIcon}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={isFocused ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingRight: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
    overflow: 'hidden',
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  icon: {
    marginRight: spacing.md,
  },
  rightIcon: {
    position: 'absolute',
    right: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
});

export default InputField;
