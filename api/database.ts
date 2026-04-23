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
      -- Claude 分类
      ('Claude 官方礼品月卡', 'Claude 官方礼品月卡，可直接使用', 199.00, 'https://vipplus.pro/images/claude.jpg', 'Claude', 100, 'available'),
      ('Claude max 20x 成品号（$200）', 'Claude max 20x 成品号，可直接使用', 299.00, 'https://vipplus.pro/images/claude.jpg', 'Claude', 0, 'unavailable'),
      
      -- ChatGPT 分类
      ('GPT Plus月卡（自助充值）', 'GPT Plus月卡，支持自助充值', 299.00, 'https://vipplus.pro/images/chatgpt.jpg', 'ChatGPT', 0, 'unavailable'),
      ('GPT Pro 月卡（自助充值）', 'GPT Pro 月卡，支持自助充值', 399.00, 'https://vipplus.pro/images/chatgpt.jpg', 'ChatGPT', 100, 'available'),
      ('GPT Plus 年卡自助充值', 'GPT Plus 年卡，支持自助充值', 2599.00, 'https://vipplus.pro/images/chatgpt.jpg', 'ChatGPT', 0, 'unavailable'),
      ('ChatGPT 稳定普号 带RT', 'ChatGPT 稳定普号，带RT功能', 49.00, 'https://vipplus.pro/images/chatgpt.jpg', 'ChatGPT', 100, 'available'),
      ('GPT Plus/Pro 成品账号', 'GPT Plus/Pro 成品账号，可直接使用', 499.00, 'https://vipplus.pro/images/chatgpt.jpg', 'ChatGPT', 0, 'unavailable'),
      
      -- Gemini 分类
      ('Gemini Pro 年卡 自助充值', 'Gemini Pro 年卡，支持自助充值', 299.00, 'https://vipplus.pro/images/gemini.jpg', 'Gemini', 100, 'available'),
      ('Gemini Pro 年卡成品账号（包gcp）', 'Gemini Pro 年卡成品账号，包含GCP账号', 399.00, 'https://vipplus.pro/images/gemini.jpg', 'Gemini', 100, 'available'),
      
      -- Grok 分类
      ('Grok Super 成品号', 'Grok Super 成品账号，可直接使用', 299.00, 'https://vipplus.pro/images/grok.jpg', 'Grok', 100, 'available'),
      
      -- 邮箱 分类
      ('Gmail 邮箱【包GCP】', 'Gmail 邮箱，包含GCP账号', 99.00, 'https://vipplus.pro/images/email.jpg', '邮箱', 100, 'available'),
      ('outlook 邮箱', 'outlook 邮箱，可直接使用', 49.00, 'https://vipplus.pro/images/email.jpg', '邮箱', 100, 'available'),
      
      -- 社交 分类
      ('Facebook 账号', 'Facebook 账号，已验证', 99.00, 'https://vipplus.pro/images/social.jpg', '社交', 100, 'available'),
      ('Threads双重验证 账户', 'Threads 双重验证账户，安全可靠', 149.00, 'https://vipplus.pro/images/social.jpg', '社交', 100, 'available'),
      ('X（推特）账号', 'X（推特）账号，可直接使用', 79.00, 'https://vipplus.pro/images/social.jpg', '社交', 100, 'available'),
      ('Instagram 账号（IG）', 'Instagram 账号，可直接使用', 89.00, 'https://vipplus.pro/images/social.jpg', '社交', 100, 'available');
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
