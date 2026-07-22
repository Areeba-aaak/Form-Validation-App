import React, { useState } from "react";
import FormInput from "./FormInput";
import PasswordRequirements from "./PasswordRequirements";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateForm,
} from "../utils/validation";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validators = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (val) => validateConfirmPassword(formData.password, val),
  };

  function handleChange(e) {
    const { name, value } = e.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

   
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }

  
    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, nextFormData.confirmPassword),
      }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  }

  function handleSubmit(e) {
  e.preventDefault();

  const allErrors = validateForm(formData);
  setErrors(allErrors);
  setTouched({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  const isValid = Object.values(allErrors).every((msg) => msg === "");

  if (isValid) {
    
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    
    users.push(newUser);

    
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Saved Users:", users);

    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setTouched({});
    setErrors({});
  }
}

  function handleReset() {
    setSubmitted(false);
  }

  const isSubmitDisabled = !Object.values(validateForm(formData)).every((msg) => msg === "");

  if (submitted) {
    return (
      <div className="card success-card" role="status">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h2>Registration successful!</h2>
        <p>Your account has been created.</p>
        <button type="button" className="btn-secondary" onClick={handleReset}>
          Register another account
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 className="card-title">Create your account</h1>
      <p className="card-subtitle">Fill in your details to get started.</p>

      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          id="name"
          name="name"
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          autoComplete="name"
        />

        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          autoComplete="email"
        />

        <FormInput
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          autoComplete="new-password"
          rightSlot={
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        {(touched.password || formData.password) && (
          <PasswordRequirements password={formData.password} />
        )}

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          autoComplete="new-password"
        />

        <button type="submit" className="btn-primary" disabled={isSubmitDisabled}>
          Create account
        </button>
      </form>
    </div>
  );
}
