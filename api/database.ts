
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database.sqlite');

// 产品数据
const products = [
  {
    id: 1,
    name: 'VIP Membership',
    description: 'Full access to all premium features for one month',
    price: 9.99,
    category: 'subscription',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Premium Course',
    description: 'Complete online course with lifetime access',
    price: 49.99,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'eBook Bundle',
    description: 'Collection of 10+ premium eBooks',
    price: 29.99,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Tools Pack',
    description: 'Premium software tools and utilities',
    price: 39.99,
    category: 'software',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Design Assets',
    description: 'Huge collection of design templates and resources',
    price: 19.99,
    category: 'design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Yearly Subscription',
    description: 'Full access for one year with 20% discount',
    price: 99.99,
    category: 'subscription',
    image: 'https://images.unsplash.com/photo-1454165804606-c305cb86dbf5?w=400&h=300&fit=crop'
  }
];

export async function initDatabase() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // 创建产品表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT
    )
  `);

  // 创建订单表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      product_id INTEGER NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 检查是否有产品数据
  const count = await db.get('SELECT COUNT(*) as count FROM products');
  
  // 如果没有产品数据，插入初始数据
  if (count && count.count === 0) {
    for (const product of products) {
      await db.run(
        'INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.category, product.image]
      );
    }
  }

  return db;
}

export async function getDatabase() {
  return await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}
