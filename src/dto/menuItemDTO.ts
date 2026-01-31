export interface CreateMenuItemDTO {
  category_id: number;
  name: string;
  description?: string;
  price: number;
  is_available?: boolean;
}

export interface UpdateMenuItemDTO {
  category_id?: number;
  name?: string;
  description?: string;
  price?: number;
  is_available?: boolean;
}

export const validateCreateMenuItem = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.category_id || typeof data.category_id !== "number") {
    errors.push("category_id is required and must be a number");
  }

  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("Name is required and must be a non-empty string");
  }

  if (data.name && data.name.length > 200) {
    errors.push("Name must not exceed 200 characters");
  }

  if (data.description !== undefined && typeof data.description !== "string") {
    errors.push("Description must be a string");
  }

  if (!data.price || typeof data.price !== "number" || data.price <= 0) {
    errors.push("Price is required and must be a positive number");
  }

  if (data.price && data.price > 99999999.99) {
    errors.push("Price exceeds maximum allowed value");
  }

  if (data.is_available !== undefined && typeof data.is_available !== "boolean") {
    errors.push("is_available must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUpdateMenuItem = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.category_id !== undefined && typeof data.category_id !== "number") {
    errors.push("category_id must be a number");
  }

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim() === "") {
      errors.push("Name must be a non-empty string");
    }
    if (data.name && data.name.length > 200) {
      errors.push("Name must not exceed 200 characters");
    }
  }

  if (data.description !== undefined && typeof data.description !== "string") {
    errors.push("Description must be a string");
  }

  if (data.price !== undefined) {
    if (typeof data.price !== "number" || data.price <= 0) {
      errors.push("Price must be a positive number");
    }
    if (data.price > 99999999.99) {
      errors.push("Price exceeds maximum allowed value");
    }
  }

  if (data.is_available !== undefined && typeof data.is_available !== "boolean") {
    errors.push("is_available must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};