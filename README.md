# Registration Form Validation App

A production-quality registration form built with React, using only manual
client-side validation (no Formik/Yup/Zod/React Hook Form).

The application performs complete client-side validation and stores registered
users in the browser's Local Storage for persistence.

---

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

---

## Build

```bash
npm run build
npm run preview
```

---

## Features

- User registration form
- Client-side validation (no third-party validation libraries)
- Inline error messages
- Live password strength requirements
- Password visibility toggle
- Confirm password validation
- Submit button disabled until all fields are valid
- Success screen after registration
- Stores registered users in **Local Storage**
- Prevents duplicate email registration (if implemented)
- Responsive and accessible UI

---

## Project Structure

```
src/
├── components/
│   ├── RegistrationForm.jsx     # Form state, handlers, validation & Local Storage
│   ├── FormInput.jsx            # Reusable controlled input with validation styling
│   └── PasswordRequirements.jsx # Live password checklist
├── utils/
│   └── validation.js            # Validation helper functions
├── App.jsx
├── main.jsx
└── index.css
```

---

## Validation Behavior

- Fields validate on blur.
- Once a field has been touched, it revalidates on every keystroke.
- Confirm Password automatically revalidates whenever Password changes.
- Submit button remains disabled until every field is valid.
- Form is validated again before submission.
- Successful submission displays a confirmation screen and resets the form.

---

## Local Storage

When a user successfully registers, their information is saved in the browser's
**Local Storage** under the key:

```text
users
```

Example stored data:

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123!"
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "SecurePass456!"
  }
]
```

You can inspect the stored data by opening:

```
Developer Tools → Application → Local Storage
```

or by running the following in the browser console:

```javascript
JSON.parse(localStorage.getItem("users"));
```

To clear all registered users:

```javascript
localStorage.removeItem("users");
```

---

## Technologies Used

- React
- JavaScript (ES6+)
- Vite
- CSS3
- Browser Local Storage API

---

## Notes

This project is intended for learning and demonstration purposes.

In a production application:

- Passwords should **never** be stored in Local Storage.
- User data should be sent securely to a backend server.
- Passwords should always be hashed before being stored in a database.