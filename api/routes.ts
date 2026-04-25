
import { Router } from 'express';
import { getDatabase } from './database.js';
import crypto from 'crypto';

const router = Router();

// 获取所有产品
router.get('/products', async (req, res) => {
  try {
    const db = await getDatabase();
    const category = req.query.category as string;
    
    let products;
    if (category && category !== 'all') {
      products = await db.all('SELECT * FROM products WHERE category = ?', [category]);
    } else {
      products = await db.all('SELECT * FROM products');
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 获取单个产品
router.get('/products/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// 创建订单
router.post('/orders', async (req, res) => {
  try {
    const { product_id, customer_name, customer_email } = req.body;
    
    if (!product_id || !customer_name || !customer_email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const db = await getDatabase();
    const product = await db.get('SELECT * FROM products WHERE id = ?', [product_id]);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const orderId = crypto.randomUUID();
    const status = 'completed';
    
    await db.run(
      'INSERT INTO orders (id, product_id, customer_name, customer_email, status) VALUES (?, ?, ?, ?, ?)',
      [orderId, product_id, customer_name, customer_email, status]
    );
    
    res.json({
      id: orderId,
      product_id,
      customer_name,
      customer_email,
      status,
      product
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// 获取订单
router.get('/orders/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const product = await db.get('SELECT * FROM products WHERE id = ?', [order.product_id]);
    
    res.json({
      ...order,
      product
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

export default router;
