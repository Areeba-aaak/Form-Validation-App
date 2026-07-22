const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

export function validateName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  return "";
}

export function validateEmail(email) {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
  return "";
}

export function getPasswordChecklist(password) {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: SPECIAL_CHAR_REGEX.test(password),
  };
}

export function validatePassword(password) {
  if (!password) return "Password is required.";

  const checklist = getPasswordChecklist(password);
  const allValid = Object.values(checklist).every(Boolean);

  if (!allValid) {
    return "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character.";
  }

  return "";
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
}

export function validateForm(formData) {
  return {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
    confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
  };
}

export function isFormValid(formData) {
  const errors = validateForm(formData);
  return Object.values(errors).every((msg) => msg === "");
}
