export interface RegisterAdminDTO {
  email: string;
  password: string;
  role?: string;
}

export interface LoginAdminDTO {
  email: string;
  password: string;
}

export const validateRegisterAdmin = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Email validation
  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  // Password validation
  if (!data.password || typeof data.password !== "string") {
    errors.push("Password is required");
  } else if (data.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  // Role validation (optional)
  if (data.role !== undefined) {
    const validRoles = ["ADMIN", "SUPER_ADMIN"];
    if (!validRoles.includes(data.role)) {
      errors.push("Role must be either ADMIN or SUPER_ADMIN");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLoginAdmin = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  }

  if (!data.password || typeof data.password !== "string") {
    errors.push("Password is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};