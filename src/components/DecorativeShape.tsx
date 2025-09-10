import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface DecorativeShapeProps {
  size?: number;
  colors?: string[];
  opacity?: number;
  style?: any;
}

const DecorativeShape: React.FC<DecorativeShapeProps> = ({
  size = 200,
  colors = ['#FF6B35', '#FFD54F', '#FFE082'],
  opacity = 0.1,
  style,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { opacity }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -50,
    right: -50,
    borderRadius: 100,
  },
  gradient: {
    flex: 1,
    borderRadius: 100,
  },
});

export default DecorativeShape;
