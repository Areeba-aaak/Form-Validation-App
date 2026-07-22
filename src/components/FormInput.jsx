import React from "react";


export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  autoComplete,
  rightSlot, 
}) {
  const showError = touched && error;
  const showValid = touched && !error && value.trim().length > 0;

  const stateClass = showError ? "is-invalid" : showValid ? "is-valid" : "";

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className={`input-wrap ${stateClass}`}>
        <input
          id={id}
          name={name}
          type={type}
          className="form-input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={Boolean(showError)}
          aria-describedby={showError ? `${id}-error` : undefined}
        />
        {rightSlot}
      </div>
      {showError && (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
