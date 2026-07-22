import React from "react";
import { getPasswordChecklist } from "../utils/validation";

const RULES = [
  { key: "minLength", label: "At least 8 characters" },
  { key: "hasUppercase", label: "One uppercase letter" },
  { key: "hasLowercase", label: "One lowercase letter" },
  { key: "hasNumber", label: "One number" },
  { key: "hasSpecialChar", label: "One special character" },
];

export default function PasswordRequirements({ password }) {
  const checklist = getPasswordChecklist(password);

  return (
    <ul className="password-checklist" aria-label="Password requirements">
      {RULES.map((rule) => {
        const met = checklist[rule.key];
        return (
          <li key={rule.key} className={met ? "req-met" : "req-unmet"}>
            <span className="req-icon" aria-hidden="true">
              {met ? "✓" : "○"}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
