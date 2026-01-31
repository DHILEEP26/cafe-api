import { PrismaClient, AdminUser } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerAdmin = async (
  email: string,
  password: string,
  role: string = "ADMIN"
): Promise<Omit<AdminUser, "password">> => {
  // Check if user already exists
  const existingUser = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      role: role as any,
    },
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginAdmin = async (
  email: string,
  password: string
): Promise<{ user: Omit<AdminUser, "password">; token: string }> => {
  // Find user
  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const getAdminById = async (
  id: number
): Promise<Omit<AdminUser, "password"> | null> => {
  const user = await prisma.adminUser.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};