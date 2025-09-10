# Native Dependencies Setup Guide

This guide will help you set up the native dependencies for the bare React Native project.

## Dependencies Used

- `react-native-vector-icons` - For icons
- `react-native-linear-gradient` - For gradient backgrounds
- `@react-native-async-storage/async-storage` - For data persistence

## Android Setup

### 1. Vector Icons
The fonts are automatically linked via the `react-native.config.js` file and the `fonts.gradle` script in `android/app/build.gradle`.

### 2. Linear Gradient
Run the following command to link the native dependencies:

```bash
cd android && ./gradlew clean && cd ..
```

### 3. AsyncStorage
No additional setup required for AsyncStorage.

## iOS Setup

### 1. Vector Icons
The fonts are already configured in `ios/Authentication/Info.plist`.

### 2. Linear Gradient
Run the following command to install pods:

```bash
cd ios && pod install && cd ..
```

### 3. AsyncStorage
No additional setup required for AsyncStorage.

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Troubleshooting

### If icons don't show up:
1. Make sure the fonts are properly linked
2. Clean and rebuild the project
3. For Android: `cd android && ./gradlew clean && cd ..`
4. For iOS: `cd ios && pod install && cd ..`

### If gradients don't work:
1. Make sure react-native-linear-gradient is properly linked
2. Clean and rebuild the project
3. Check that the native modules are properly installed

### If AsyncStorage doesn't work:
1. Make sure @react-native-async-storage/async-storage is installed
2. No additional linking required for this package
