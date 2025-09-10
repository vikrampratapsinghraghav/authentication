# React Native Authentication App

A React Native app with Login and Signup functionality using React Context API to manage authentication state.

## Features

- **Authentication Context**: Global state management using React Context API
- **Login Screen**: Email/password authentication with validation
- **Signup Screen**: User registration with name, email, and password
- **Home Screen**: Displays user information and logout functionality
- **Persistent Authentication**: Uses AsyncStorage to maintain login state
- **Navigation**: React Navigation for seamless screen transitions
- **Modern UI**: Clean, intuitive design with proper error handling

## Screens

### 1. Login Screen
- Email and password input fields
- Form validation for email format and password length
- Error messages for invalid credentials
- Navigation to Signup screen

### 2. Signup Screen
- Name, email, and password input fields
- Validation for all required fields
- Email format validation
- Password length validation (minimum 6 characters)
- Navigation back to Login screen

### 3. Home Screen
- Displays logged-in user's information (name, email, ID)
- Logout functionality with confirmation dialog
- Clean card-based layout

## Technical Implementation

### Authentication Context
- `AuthProvider`: Wraps the app and provides authentication state
- `useAuth`: Custom hook to access authentication functions
- Functions: `login`, `signup`, `logout`
- State: `user`, `isLoading`

### Data Persistence
- Uses AsyncStorage to persist user authentication state
- Automatically loads user data on app startup
- Maintains login state across app restarts

### Navigation
- React Navigation with Native Stack Navigator
- Conditional navigation based on authentication state
- Automatic redirection to appropriate screens

### Form Validation
- Email format validation using regex
- Password length validation
- Required field validation
- User-friendly error messages

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

3. For Android:
   ```bash
   npm run android
   ```

## Dependencies

- React Native
- React Navigation
- AsyncStorage
- React Native Safe Area Context
- React Native Screens

## Project Structure

```
src/
├── contexts/
│   └── AuthContext.tsx    # Authentication state management
└── screens/
    ├── LoginScreen.tsx    # Login form
    ├── SignupScreen.tsx   # Registration form
    ├── HomeScreen.tsx     # User dashboard
    └── LoadingScreen.tsx  # Loading state
```

## Usage

1. **First Time Users**: Navigate to Signup screen to create an account
2. **Existing Users**: Use Login screen with email and password
3. **Home Screen**: View user information and logout when done
4. **Persistence**: App remembers login state between sessions

## Enhanced Field Validation

The app now includes comprehensive regex-based validation for all form fields:

### Email Validation
- **RFC 5322 compliant** email regex pattern
- Validates proper email format with local part, @ symbol, and domain
- Checks for maximum length (254 characters)
- Handles international domain names
- Examples of valid emails:
  - `user@example.com`
  - `test.email@domain.co.uk`
  - `user+tag@example.org`

### Name Validation
- Allows letters, spaces, hyphens, and apostrophes
- Minimum 2 characters, maximum 50 characters
- Supports international names with accents
- Examples of valid names:
  - `John Doe`
  - `O'Connor`
  - `Mary-Jane Smith`
  - `José María`

### Password Validation
- **Basic validation**: Minimum 6 characters
- **Strong validation**: Minimum 8 characters with:
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character (@$!%*?&)
- Real-time password strength indicator
- Visual feedback with color-coded strength meter
- Maximum length limit (128 characters)

### Validation Features
- **Real-time validation**: Errors clear as user types
- **Visual feedback**: Red borders for invalid fields
- **Comprehensive error messages**: Clear, actionable feedback
- **Password strength meter**: Visual indicator of password strength
- **Requirements display**: Shows missing password requirements
- **Edge case handling**: Empty fields, length limits, special characters

### Validation Utility Functions
Located in `src/utils/validation.ts`:
- `validateEmail()`: Email format and length validation
- `validateName()`: Name format and length validation
- `validatePassword()`: Password strength validation
- `validatePasswordStrength()`: Detailed password analysis
- `validateForm()`: General form validation helper

### Security Considerations
- Passwords are validated for strength but not stored in plain text
- Email validation prevents common injection attempts
- Name validation prevents XSS through special characters
- All inputs are trimmed and sanitized
- Length limits prevent buffer overflow attacks

## Modern UI Design

The app now features a modern, clean design inspired by contemporary mobile app aesthetics:

### Design System
- **Color Palette**: Orange gradient theme (#FF6B35 to #FFD54F)
- **Typography**: Clean sans-serif fonts with proper hierarchy
- **Spacing**: Consistent spacing system (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- **Shadows**: Subtle elevation with proper shadow system
- **Border Radius**: Consistent rounded corners (4px, 8px, 12px, 16px, 24px)

### Visual Components

**Gradient Buttons:**
- Orange to yellow gradient background
- Subtle shadow effects
- Arrow icons for better UX
- Loading states with spinners

**Input Fields:**
- Clean white backgrounds with subtle borders
- Icons for visual context (mail, lock, person)
- Focus states with orange border highlights
- Error states with red borders and messages
- Proper label styling with uppercase text

**Decorative Elements:**
- Gradient circular shapes in top-right corners
- Subtle opacity for non-intrusive design
- Consistent positioning across screens

**Cards and Containers:**
- Clean white cards with subtle shadows
- Proper padding and margins
- Rounded corners for modern look
- Icon headers for information cards

### Screen-Specific Design

**Login Screen:**
- Large title with subtitle
- "FORGOT" link positioned next to password field
- Gradient login button with arrow icon
- Footer link for navigation to signup

**Signup Screen:**
- Back arrow button in top-left
- Password strength indicator with color-coded progress bar
- Confirm password field for better UX
- Gradient signup button with arrow icon

**Home Screen:**
- Welcome message with user information cards
- Icon-based information display
- Gradient logout button with warning colors
- Clean card layout with proper spacing

### Responsive Design
- Keyboard-aware layouts
- Proper safe area handling
- Scrollable content where needed
- Consistent spacing across different screen sizes

### Accessibility
- Proper contrast ratios
- Touch-friendly button sizes (minimum 48px)
- Clear visual hierarchy
- Readable typography scales
