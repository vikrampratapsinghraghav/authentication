// Validation test examples - demonstrates regex patterns
import { 
  EMAIL_REGEX, 
  NAME_REGEX, 
  STRONG_PASSWORD_REGEX, 
  BASIC_PASSWORD_REGEX,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordStrength
} from './validation';

// Test email validation
console.log('=== EMAIL VALIDATION TESTS ===');
const emailTests = [
  'user@example.com',           // Valid
  'test.email@domain.co.uk',    // Valid with subdomain
  'user+tag@example.org',       // Valid with plus sign
  'invalid-email',              // Invalid - no @
  '@example.com',               // Invalid - no local part
  'user@',                      // Invalid - no domain
  'user..double@example.com',   // Invalid - consecutive dots
  'user@example..com',          // Invalid - consecutive dots in domain
  'user@example.com.',          // Invalid - trailing dot
  'user name@example.com',      // Invalid - space in local part
];

emailTests.forEach(email => {
  const isValid = EMAIL_REGEX.test(email);
  const validation = validateEmail(email);
  console.log(`${email}: ${isValid ? '✅' : '❌'} (${validation.isValid ? 'Valid' : 'Invalid'})`);
});

// Test name validation
console.log('\n=== NAME VALIDATION TESTS ===');
const nameTests = [
  'John Doe',                   // Valid
  "O'Connor",                   // Valid with apostrophe
  'Mary-Jane Smith',            // Valid with hyphen
  'José María',                 // Valid with accents
  'A',                          // Invalid - too short
  'X',                          // Invalid - too short
  'John123',                    // Invalid - contains numbers
  'John@Doe',                   // Invalid - contains special chars
  'John.Doe',                   // Invalid - contains dots
  '  John  ',                   // Valid - will be trimmed
];

nameTests.forEach(name => {
  const isValid = NAME_REGEX.test(name.trim());
  const validation = validateName(name);
  console.log(`${name}: ${isValid ? '✅' : '❌'} (${validation.isValid ? 'Valid' : 'Invalid'})`);
});

// Test password validation
console.log('\n=== PASSWORD VALIDATION TESTS ===');
const passwordTests = [
  'Password123!',               // Strong password
  'MyStr0ng@Pass',              // Strong password
  'password',                   // Weak - no uppercase, numbers, special chars
  'PASSWORD',                   // Weak - no lowercase, numbers, special chars
  'Password',                   // Weak - no numbers, special chars
  'Password123',                // Weak - no special chars
  'Pass1!',                     // Weak - too short
  '12345678',                   // Weak - no letters, special chars
  'abcdefgh',                   // Weak - no uppercase, numbers, special chars
  'ABCDEFGH',                   // Weak - no lowercase, numbers, special chars
];

passwordTests.forEach(password => {
  const isStrong = STRONG_PASSWORD_REGEX.test(password);
  const isBasic = BASIC_PASSWORD_REGEX.test(password);
  const validation = validatePassword(password, true);
  const strength = validatePasswordStrength(password);
  
  console.log(`${password}:`);
  console.log(`  Basic: ${isBasic ? '✅' : '❌'}`);
  console.log(`  Strong: ${isStrong ? '✅' : '❌'}`);
  console.log(`  Validation: ${validation.isValid ? '✅' : '❌'} ${validation.message || ''}`);
  console.log(`  Strength: ${strength.score}/5 (${strength.feedback.join(', ')})`);
  console.log('');
});

// Test edge cases
console.log('=== EDGE CASES ===');
console.log('Empty email:', validateEmail('').isValid ? '❌' : '✅');
console.log('Empty name:', validateName('').isValid ? '❌' : '✅');
console.log('Empty password:', validatePassword('').isValid ? '❌' : '✅');
console.log('Very long email:', validateEmail('a'.repeat(300) + '@example.com').isValid ? '❌' : '✅');
console.log('Very long name:', validateName('A'.repeat(100)).isValid ? '❌' : '✅');
console.log('Very long password:', validatePassword('A'.repeat(200)).isValid ? '❌' : '✅');
