import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const BottomSheetContainer: React.FC<Props> = ({ children, style }) => {
  return (
    <View style={[styles.bottomSheet, style]}>
      <View style={styles.sheetHandle} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    marginTop: 'auto',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 10,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
});

export default BottomSheetContainer;
