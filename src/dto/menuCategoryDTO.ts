export interface CreateMenuCategoryDTO {
  name: string;
  display_order?: number;
  is_active?: boolean;
}

export interface UpdateMenuCategoryDTO {
  name?: string;
  display_order?: number;
  is_active?: boolean;
}

export const validateCreateMenuCategory = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("Name is required and must be a non-empty string");
  }

  if (data.name && data.name.length > 100) {
    errors.push("Name must not exceed 100 characters");
  }

  if (
    data.display_order !== undefined &&
    (typeof data.display_order !== "number" || data.display_order < 0)
  ) {
    errors.push("Display order must be a non-negative number");
  }

  if (
    data.is_active !== undefined &&
    typeof data.is_active !== "boolean"
  ) {
    errors.push("is_active must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUpdateMenuCategory = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim() === "") {
      errors.push("Name must be a non-empty string");
    }
    if (data.name && data.name.length > 100) {
      errors.push("Name must not exceed 100 characters");
    }
  }

  if (
    data.display_order !== undefined &&
    (typeof data.display_order !== "number" || data.display_order < 0)
  ) {
    errors.push("Display order must be a non-negative number");
  }

  if (
    data.is_active !== undefined &&
    typeof data.is_active !== "boolean"
  ) {
    errors.push("is_active must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};