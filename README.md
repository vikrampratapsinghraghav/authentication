# Authentication App (React Native)

A polished, production-ready React Native authentication starter featuring a modern UI, Context-based auth, form validation with helpful UX, and persistent login.

## ✨ Features
- Context-based Authentication (`login`, `signup`, `logout`, `user`)
- Persisted auth with `@react-native-async-storage/async-storage`
- Modern UI with gradient buttons, decorative shapes, and icons
- Field validation (email/name/password) with strong password support
- React Navigation Native Stack (Login, Signup, Home)
- TypeScript-first, zero type errors
- Bare React Native compatible dependencies (no Expo-only libs)

## 🧱 Tech Stack
- React Native 0.81, React 19
- React Navigation (native + native-stack)
- AsyncStorage for persistence
- `react-native-linear-gradient` for gradients
- `react-native-vector-icons` (Ionicons) for icons
- TypeScript with strict settings

## 📸 Screens

### App Screenshots

![Login](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-09-10%20at%2014.26.28.png)

![Signup](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-09-10%20at%2014.26.35.png)

![Home](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-09-10%20at%2014.26.39.png)

- Login: Email + Password, forgot link, validation errors
- Signup: Name + Email + Password + Confirm, strength meter
- Home: Shows logged-in user and logout

## 🚀 Quick Start
1) Install deps
```bash
npm install
```

2) iOS setup
```bash
cd ios && pod install && cd ..
npm run ios
```

3) Android setup
```bash
npm run android
```

If you changed native deps, clean first:
```bash
# Android
cd android && ./gradlew clean && cd ..
# iOS
cd ios && pod install --repo-update && cd ..
```

## 📂 Project Structure
```
src/
├── components/
│   ├── DecorativeShape.tsx
│   ├── GradientButton.tsx
│   └── InputField.tsx
├── contexts/
│   └── AuthContext.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── LoadingScreen.tsx
│   ├── LoginScreen.tsx
│   └── SignupScreen.tsx
├── styles/
│   └── theme.ts
└── utils/
    ├── validation.ts
    └── validation.test.ts
```

## 🔐 Authentication Flow
- `AuthProvider` loads `user` from AsyncStorage on launch
- `login(email, password)` validates input and resolves a stored user
- `signup(name, email, password)` saves a new user and logs in
- `logout()` clears the user and storage
- Screens are gated by `user`: unauthenticated → AuthStack; authenticated → AppStack

## ✅ Validation
Robust regex-based validation with helpful messages. Key patterns:
- Email: RFC 5322 compliant
- Name: Letters + spaces + hyphens + apostrophes (2–50 chars)
- Password:
  - Basic: 6+ chars
  - Strong: 8+ with upper, lower, number, special

Utility: `src/utils/validation.ts` (also includes `validatePasswordStrength`).

## 🎨 Design System
- Colors: Orange gradient `#FF6A00 → #FFC107`, neutrals, semantic colors
- Typography: consistent heading/body/label styles
- Spacing: 4/8/16/24/32/48/64
- Shadows + radii unified in `src/styles/theme.ts`
- Centered button text even with right-side icon

## 🛠️ Scripts
```json
npm run ios        # Build & run iOS (simulator)
npm run android    # Build & run Android
npm run start      # Start Metro
npm run test       # Jest tests (if added)
```

## 🧩 Native Dependencies (Bare RN)
- `react-native-linear-gradient`: gradient backgrounds (linked via Pods/Gradle)
- `react-native-vector-icons`: icons (fonts linked via assets + Info.plist)
- `@react-native-async-storage/async-storage`: persisted storage

iOS: Fonts are declared in `ios/Authentication/Info.plist` → `UIAppFonts`.
Android: `android/app/build.gradle` includes `fonts.gradle` for vector-icons.

## 🧪 Type Safety
```bash
npx tsc --noEmit --noUnusedLocals
```
Zero errors expected.

## 🐞 Troubleshooting
- Icons missing (iOS):
  - Clean build: Product → Clean Build Folder (or `rm -rf ios/build`)
  - Ensure `UIAppFonts` includes Ionicons and other fonts
- Icons missing (Android):
  - `cd android && ./gradlew clean && cd ..` then rebuild
- Pod install errors:
  - Ensure `@react-native-community/cli` dev deps are present
  - Re-run `cd ios && pod install --repo-update && cd ..`
- Red screen after native changes:
  - Stop Metro, `npm start -- --reset-cache`, then rebuild

## 🔒 Notes & Security
- Demo credentials are stored locally for assignment purposes only
- For production, replace with secure backend auth (JWT/OAuth), hashing, and TLS

## 📄 License
MIT — use freely for learning or as a starter.

---
Made with care for a clean developer & user experience.
