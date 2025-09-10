import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import GradientButton from '../components/GradientButton';
import DecorativeShape from '../components/DecorativeShape';
import { colors, typography, spacing, shadows, borderRadius } from '../styles/theme';

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            await logout();
            setIsLoggingOut(false);
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <DecorativeShape />
        
        <View style={styles.header}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>You are successfully logged in</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="person-circle" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>Full Name</Text>
            </View>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="mail" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>Email Address</Text>
            </View>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="key" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>User ID</Text>
            </View>
            <Text style={styles.infoValue}>{user.id}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <GradientButton
            title="LOGOUT"
            onPress={handleLogout}
            loading={isLoggingOut}
            icon="log-out-outline"
            style={styles.logoutButton}
            colors={[colors.error, '#FF8A80']}
          />
        </View>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySecondary,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: spacing.xxxl,
  },
  infoCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    ...typography.label,
    marginLeft: spacing.sm,
  },
  infoValue: {
    ...typography.body,
    fontWeight: '600',
  },
  actions: {
    marginTop: 'auto',
  },
  logoutButton: {
    marginBottom: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xxxl,
  },
});

export default HomeScreen;
