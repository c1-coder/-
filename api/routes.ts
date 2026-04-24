import express from 'express';
import { getDatabase } from './database';

const router = express.Router();

// 获取商品列表
router.get('/products', async (req, res) => {
  try {
    const db = await getDatabase();
    const { category, page = 1, limit = 8 } = req.query;

    let query = 'SELECT * FROM products';
    const params: any[] = [];

    if (category && category !== '全部') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    // 获取总数
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const countResult = await db.get(countQuery, params);
    const total = countResult.count;

    // 分页
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit as string));
    params.push((parseInt(page as string) - 1) * parseInt(limit as string));

    const products = await db.all(query, params);

    res.json({
      products,
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 获取商品详情
router.get('/product/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;

    const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 创建订单
router.post('/order', async (req, res) => {
  try {
    const db = await getDatabase();
    const { productId, quantity = 1, contactInfo } = req.body;

    // 检查商品是否存在
    const product = await db.get('SELECT * FROM products WHERE id = ?', [productId]);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // 检查库存
    if (product.stock < quantity) {
      res.status(400).json({ error: 'Insufficient stock' });
      return;
    }

    // 生成订单号
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const amount = product.price * quantity;

    // 创建订单
    await db.run(
      'INSERT INTO orders (id, product_id, product_name, quantity, amount, status, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [orderId, productId, product.name, quantity, amount, 'pending', contactInfo]
    );

    // 减少库存
    await db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, productId]);

    // 生成支付链接（模拟）
    const paymentUrl = `http://localhost:8080/payment/${orderId}`;

    res.json({
      orderId,
      amount,
      paymentUrl
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 查询订单详情
router.get('/order/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;

    const order = await db.get('SELECT * FROM orders WHERE id = ?', [id]);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 支付回调
router.post('/payment/callback', async (req, res) => {
  try {
    const db = await getDatabase();
    const { orderId, transactionId, status } = req.body;

    // 更新订单状态
    await db.run('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, orderId]);

    // 创建支付记录
    await db.run(
      'INSERT INTO payments (id, order_id, amount, status, transaction_id) VALUES (?, ?, ?, ?, ?)',
      [`PAY${Date.now()}`, orderId, 0, status, transactionId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing payment callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
