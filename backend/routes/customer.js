const express = require('express')
const pool = require('../config')

router = express.Router()

function formatDate(dateFormat, today=false) {
  var datetime = new Date(dateFormat)
  var date = `${datetime.getFullYear()}/${((datetime.getMonth() + 1) + 1000).toString().slice(2)}/${(datetime.getDate() + 1000).toString().slice(2)}`
  var time = `${(datetime.getHours() + 1000).toString().slice(2)}:${(datetime.getMinutes() + 1000).toString().slice(2)}:${(datetime.getSeconds() + 1000).toString().slice(2)}`
  dateFormat = `${datetime.getDate() === new Date().getDate() && today ? 'Today' : date} ${time}`
  return dateFormat;
}

// customer login
router.post('/table/:tableId/login', async (req, res) => {
  // validation then create new order and serviced_customer
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [users, field] = await conn.query(
      `SELECT * 
      FROM customer_member
      JOIN \`account\`
      USING (account_id)
      WHERE username = ? AND password = ?`,
      [req.body.username, req.body.password]
    )
    if (users.length > 0) {
      const [row1, field1] = await conn.query(
        `INSERT INTO serviced_customer (account_id, check_in)
        VALUES(?,NOW())`,
        [users[0].account_id]
      )

      const [row2, field2] = await conn.query(
        `INSERT INTO \`order\` (status, serviced_id, table_id)
        VALUES ('created', ?, ?)`,
        [row1.insertId, req.params.tableId]
      )

      const [row3, field3] = await conn.query(
        `UPDATE \`table\`
        SET \`status\` = 'not_ready'
        WHERE table_id = ?`,
        [req.params.tableId]
      )
    }
    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// customer as guest
router.post('/table/:tableId/guest', async (req, res) => {
  // create new order and serviced_customer
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `INSERT INTO serviced_customer (check_in)
      VALUES(NOW())`
    )

    const [row2, field2] = await conn.query(
      `INSERT INTO \`order\` (quantity_item, total_price, status, serviced_id, table_id)
      VALUES (0, 0.00, 'created', ?, ?)`,
      [row1.insertId, req.params.tableId]
    )

    const [row3, field3] = await conn.query(
      `UPDATE \`table\`
      SET \`status\` = 'not_ready'
      WHERE table_id = ?`,
      [req.params.tableId]
    )

    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// get order status
router.get('/table/:tableId/status', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [state, field1] = await conn.query(
      `SELECT o.status
      FROM \`order\` AS o
      JOIN \`table\` AS t
      USING (table_id)
      WHERE table_id = ? AND t.status = 'not_ready' AND o.status != 'completed'`,
      [req.params.tableId]
    )
    await conn.commit()
    if (state.length === 1) {
      res.json({ status: state[0].status })
    } else {
      res.json({ status: null })
    }
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// get order, orderItem, menus by table id
router.get('/table/:tableId/order', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [order, field1] = await conn.query(
      `SELECT *
      FROM \`order\`
      WHERE table_id = ? AND \`status\` != 'completed'`,
      [req.params.tableId]
    )

    const [menus, field2] = await conn.query(
      `SELECT *
      FROM menu
      WHERE menu_status = 'ready'`
    )

    const [orderItems, field3] = await conn.query(
      `SELECT *
      FROM order_item
      WHERE order_id = ?`,
      [order[0].order_id]
    )

    const [customer, field4] = await conn.query(
      `SELECT *
      FROM serviced_customer
      WHERE serviced_id = ?`,
      [order[0].serviced_id]
    )

    await conn.commit()
    res.json({
      order: order[0],
      menus: menus,
      orderItems: orderItems,
      customer: customer[0]
    })
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// add new item into order
router.post('/order/:orderId/add', async (req, res) => {
  var menu = req.body.menu
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `INSERT INTO order_item (price, amount, total_price, order_id, menu_id)
      VALUES (?,?,?,?,?)`,
      [menu.menu_price, 1, menu.menu_price, req.params.orderId, menu.menu_id]
    )

    const [row2, field2] = await conn.query(
      `UPDATE \`order\`
      SET total_price = total_price + ?, quantity_item = quantity_item + 1
      WHERE order_id = ?`,
      [menu.menu_price, req.params.orderId]
    )
    await conn.commit()
    res.json({ item_no: row1.insertId })
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// delete item from order
router.delete('/order/:orderId/:itemNo/delete', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `UPDATE \`order\`
      SET total_price = total_price - (
        SELECT total_price
        FROM order_item
        WHERE item_no = ?
      ), quantity_item = quantity_item - (
        SELECT amount
        FROM order_item
        WHERE item_no = ?
      )
      WHERE order_id = ?`,
      [req.params.itemNo, req.params.itemNo, req.params.orderId]
    )

    const [row2, field2] = await conn.query(
      `DELETE FROM order_item
      WHERE item_no = ?`,
      [req.params.itemNo]
    )
    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// decrease amount of item from order
router.put('/order/:orderId/:itemNo/decrease', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `UPDATE order_item
      SET total_price = total_price - price, amount = amount - 1
      WHERE item_no = ?`,
      [req.params.itemNo]
    )

    const [row2, field2] = await conn.query(
      `UPDATE \`order\`
      SET total_price = total_price - (
        SELECT price
        FROM order_item
        WHERE item_no = ?
      ), quantity_item = quantity_item - 1
      WHERE order_id = ?`,
      [req.params.itemNo, req.params.orderId]
    )
    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// increase amount of item in order
router.put('/order/:orderId/:itemNo/increase', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `UPDATE order_item
      SET total_price = total_price + price, amount = amount + 1
      WHERE item_no = ?`,
      [req.params.itemNo]
    )

    const [row2, field2] = await conn.query(
      `UPDATE \`order\`
      SET total_price = total_price + (
        SELECT price
        FROM order_item
        WHERE item_no = ?
      ), quantity_item = quantity_item + 1
      WHERE order_id = ?`,
      [req.params.itemNo, req.params.orderId]
    )

    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// delete all item from order
router.delete('/order/:orderId/clear', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `DELETE FROM order_item
      WHERE order_id = ?`,
      [req.params.orderId]
    )

    const [row2, field2] = await conn.query(
      `UPDATE \`order\`
      SET total_price = ?, quantity_item = ?, \`status\` = ?
      WHERE order_id = ?`,
      [0.00, 0, 'created', req.params.orderId]
    )

    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// confirm ordering for order
router.post('/order/:orderId/confirm', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `UPDATE \`order\`
      SET \`status\` = ?, ordering_time = NOW()
      WHERE order_id = ?`,
      ['pending', req.params.orderId]
    )
    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

// create bill and return
router.post('/table/:tableId/billing', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [[order]] = await conn.query(
      `SELECT * FROM \`order\` 
      WHERE table_id = ? AND \`status\` != 'completed'`,
      [req.params.tableId]
    )

    const [row1, field1] = await conn.query(
      `UPDATE \`order\`
      SET \`status\` = 'billing'
      WHERE table_id = ? AND \`status\` != 'completed' `,
      [req.params.tableId]
    )

    const [receipts, field2] = await conn.query(
      `SELECT receipt_no
      FROM receipt`
    )

    var generator = () => {
      var str = ''
      for (var i = 0; i < 10; i++) {
        str += Math.floor(Math.random() * 10)
      }
      return str
    }

    var receiptNo = generator()
    while (receipts.includes(receiptNo)) {
      receiptNo = random()
    }

    const [row2, field3] = await conn.query(
      `INSERT INTO receipt (create_date, receipt_no, order_id)
      VALUES (NOW(), ?, ?)`,
      [receiptNo, order.order_id]
    )

    await conn.commit()
    res.status(200).send()
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

router.get('/table/:tableId/billing', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [[order]] = await conn.query(
      `SELECT * FROM \`order\`
      WHERE table_id = ? AND \`status\` != 'completed'`,
      [req.params.tableId]
    )

    const [[receipt]] = await conn.query(
      `SELECT create_date, receipt_no
      FROM receipt
      WHERE order_id = ?`,
      [order.order_id]
    )

    const [customer, field] = await conn.query(
      `SELECT CONCAT(fname, ' ', lname) AS \`full_name\`, check_in
      FROM \`order\`
      JOIN serviced_customer AS sc
      USING (serviced_id)
      JOIN customer_member AS cm
      ON (sc.account_id IS NOT NULL AND sc.account_id = cm.account_id)
      JOIN \`account\` AS a
      ON (cm.account_id = a.account_id)
      WHERE table_id = ? AND \`status\` != 'completed' `,
      [req.params.tableId]
    )

    const [[normal]] = await conn.query(
      `SELECT check_in
      FROM \`order\`
      JOIN serviced_customer
      USING(serviced_id)
      WHERE order_id = ?`,
      [order.order_id]
    )

    data = customer.length > 0 ? customer[0] : { full_name: null, check_in: normal.check_in }

    const [orderItems, field2] = await conn.query(
      `SELECT m.menu_name, oi.*, m.image_file_path
        FROM order_item AS oi
        JOIN menu AS m
        USING(menu_id)
        WHERE order_id = ?`,
      [order.order_id]
    )

    data.check_in = formatDate(data.check_in, false)
    receipt.create_date = formatDate(receipt.create_date)
    await conn.commit()
    res.json({ order: order, receipt: receipt, customer: data, orderItems: orderItems })
  }
  catch (err) {
    await conn.rollback()
    res.status(500).send(err)
  }
  finally {
    conn.release()
  }
})

exports.router = router