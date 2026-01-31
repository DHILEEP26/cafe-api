import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@restaurant.com' },
    update: {},
    create: {
      email: 'admin@restaurant.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create menu categories
  const categories = await Promise.all([
    prisma.menuCategory.upsert({
      where: { name: 'Appetizers' },
      update: {},
      create: {
        name: 'Appetizers',
        display_order: 1,
        is_active: true,
      },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'Main Course' },
      update: {},
      create: {
        name: 'Main Course',
        display_order: 2,
        is_active: true,
      },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'Desserts' },
      update: {},
      create: {
        name: 'Desserts',
        display_order: 3,
        is_active: true,
      },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'Beverages' },
      update: {},
      create: {
        name: 'Beverages',
        display_order: 4,
        is_active: true,
      },
    }),
  ]);
  console.log('Created categories:', categories.length);

  // Create menu items
  const menuItems = await Promise.all([
    // Appetizers
    prisma.menuItem.create({
      data: {
        category_id: categories[0].id,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan cheese and Caesar dressing',
        price: 12.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[0].id,
        name: 'Bruschetta',
        description: 'Grilled bread with tomatoes, basil, and olive oil',
        price: 9.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[0].id,
        name: 'Mozzarella Sticks',
        description: 'Crispy fried mozzarella served with marinara sauce',
        price: 8.99,
        is_available: true,
      },
    }),

    // Main Course
    prisma.menuItem.create({
      data: {
        category_id: categories[1].id,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with vegetables and lemon butter sauce',
        price: 24.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[1].id,
        name: 'Beef Tenderloin',
        description: 'Premium beef with mashed potatoes and seasonal vegetables',
        price: 32.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[1].id,
        name: 'Chicken Alfredo Pasta',
        description: 'Creamy fettuccine pasta with grilled chicken',
        price: 18.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[1].id,
        name: 'Vegetarian Pizza',
        description: 'Wood-fired pizza with seasonal vegetables and mozzarella',
        price: 16.99,
        is_available: false, // Example of unavailable item
      },
    }),

    // Desserts
    prisma.menuItem.create({
      data: {
        category_id: categories[2].id,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 8.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[2].id,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with vanilla ice cream',
        price: 9.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[2].id,
        name: 'Cheesecake',
        description: 'New York style cheesecake with berry compote',
        price: 7.99,
        is_available: true,
      },
    }),

    // Beverages
    prisma.menuItem.create({
      data: {
        category_id: categories[3].id,
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 5.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[3].id,
        name: 'Cappuccino',
        description: 'Italian coffee with steamed milk foam',
        price: 4.99,
        is_available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        category_id: categories[3].id,
        name: 'Iced Tea',
        description: 'Refreshing iced tea with lemon',
        price: 3.99,
        is_available: true,
      },
    }),
  ]);

  console.log('Created menu items:', menuItems.length);
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });