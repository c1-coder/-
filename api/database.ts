import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// 数据库连接
let db: any = null;

// 初始化数据库
export async function initDatabase() {
  if (db) return db;

  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // 创建表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      category TEXT NOT NULL,
      stock INTEGER DEFAULT 0,
      status TEXT DEFAULT 'available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      product_id INTEGER,
      product_name TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      contact_info TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products (id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      order_id TEXT,
      amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      transaction_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders (id)
    );
  `);

  // 检查是否需要初始化商品数据
  const count = await db.get('SELECT COUNT(*) as count FROM products');
  if (count.count === 0) {
    await db.exec(`
      INSERT INTO products (name, description, price, image, category, stock, status) VALUES
      ('Claude 官方礼品月卡', 'Claude 官方礼品月卡，可直接使用', 199.00, 'https://vipplus.pro/images/claude.jpg', 'Claude', 100, 'available'),
      ('Gemini Pro 年卡 自助充值', 'Gemini Pro 年卡，支持自助充值', 299.00, 'https://vipplus.pro/images/gemini.jpg', 'Gemini', 100, 'available'),
      ('GPT Plus月卡（自助充值）', 'GPT Plus月卡，支持自助充值', 299.00, 'https://vipplus.pro/images/gptplus.jpg', 'ChatGPT', 0, 'unavailable'),
      ('GPT Pro 月卡（自助充值）', 'GPT Pro 月卡，支持自助充值', 399.00, 'https://vipplus.pro/images/gptpro.jpg', 'ChatGPT', 100, 'available'),
      ('Gemini Pro 年卡成品账号（包gcp）', 'Gemini Pro 年卡成品账号，包含GCP账号', 399.00, 'https://vipplus.pro/images/gemini-account.jpg', 'Gemini', 100, 'available'),
      ('Grok Super 成品号', 'Grok Super 成品账号，可直接使用', 299.00, 'https://vipplus.pro/images/grok.jpg', 'Grok', 100, 'available'),
      ('Facebook 账号', 'Facebook 账号，已验证', 99.00, 'https://vipplus.pro/images/facebook.jpg', '社交', 100, 'available'),
      ('Threads双重验证 账户', 'Threads 双重验证账户', 149.00, 'https://vipplus.pro/images/threads.jpg', '社交', 100, 'available');
    `);
  }

  return db;
}

// 获取数据库连接
export async function getDatabase() {
  if (!db) {
    await initDatabase();
  }
  return db;
}
