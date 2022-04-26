const express = require('express')
const pool = require('../config')

router = express.Router()

function formatDate(dateFormat) {
  var datetime = new Date(dateFormat)
  var date = `${datetime.getFullYear()}/${(datetime.getMonth() + 1000).toString().slice(2)}/${(datetime.getDate() + 1000).toString().slice(2)}`
  var time = `${(datetime.getHours() + 1000).toString().slice(2)}:${(datetime.getMinutes() + 1000).toString().slice(2)}:${(datetime.getSeconds() + 1000).toString().slice(2)}`
  dateFormat = `${datetime.getDate() === new Date().getDate() ? 'To Day' : date} ${time}`
  return dateFormat;
}

// employee login
router.post('/manager/login', async (req, res) => {
  var body = req.body
  res.send()
})

// get all menu
router.get('/menus', async (req, res) => {
  // need all menus, except deleted menu
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [menu, filed] = await conn.query(
      `SELECT menu_name, menu_price, member_price, image_file_path FROM menu WHERE menu_status != 'deleted'`
    )
    await conn.commit()
    res.json({ menus: menu })
  }
  catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  }
  finally {
    conn.release();
  }
})

// get all table
router.get('/tables', async (req, res) => {
  // need all table with order in each table (if exists)
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [tables, field1] = await conn.query(
      `SELECT table_id, status AS table_status 
      FROM \`table\``
    )


    const [orders, field2] = await conn.query(
      `SELECT order_id, ordering_time, served_time, quantity_item, total_price, status, serviced_id, table_id AS table_number
      FROM \`order\`
      WHERE \`status\` != 'completed'`
    )

    var data = []
    for (var table of tables) {
      if (table.table_status === 'not_ready') {
        var order = orders.find(order => order.table_number === table.table_id)
        if (order.ordering_time !== null) {
          order.ordering_time = formatDate(order.ordering_time)
        }
        if (order.served_time !== null) {
          order.served_time = formatDate(order.served_time)
        }
        delete order.table_number
        data.push(Object.assign(order, table))
      }
      else {
        data.push(table)
      }
    }
    await conn.commit()
    res.json({ tables: data })
  }
  catch (err) {
    await conn.rollback()
    return res.status(500).json(err);
  }
  finally {
    conn.release()
  }
})

// get order detail
router.get('/order/:orderId', async (req, res) => {
  // need all order item in order and customer data of order
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [orderItem, field1] = await conn.query(
      `SELECT order_item.*, menu_name
    FROM order_item
    JOIN menu
    USING (menu_id)
    WHERE order_id = ?`,
      [req.params.orderId]
    )

    const [customer, field2] = await conn.query(
      `SELECT sc.check_in, CONCAT(fname, ' ', lname) AS \`full_name\`, sc.check_out
    FROM \`order\` o
    JOIN serviced_customer sc
    USING (serviced_id)
    LEFT OUTER JOIN customer_member cm
    USING (account_id)
    JOIN \`account\` a
    USING (account_id)
    WHERE order_id = ?`,
      [req.params.orderId]
    )

    const [customer2, field3] = await conn.query(
      `SELECT check_in, check_out
      FROM serviced_customer
      JOIN \`order\`
      USING (serviced_id)
      WHERE order_id = ?`,
      [req.params.orderId]
    )

    var data = []
    if (customer.length === 1) {
      for (var cust of customer) {
        cust.check_in = formatDate(cust.check_in)
        cust.check_out = cust.check_out === null ? null : formatDate(cust.check_out)
      }
      data.push(cust)
    }
    else {
      for (var cust of customer2) {
        cust.full_name = '-'
        cust.check_in = formatDate(cust.check_in)
        cust.check_out = cust.check_out === null ? null : formatDate(cust.check_out)
      }
      data.push(cust)
    }
    await conn.commit();
    res.json({ orderItem: orderItem, customer: data })
  }
  catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  }
  finally {
    conn.release()
  }

})

// set order status to 'served'
router.put('/order/:orderId/serve', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row, field] = await conn.query(
      `UPDATE \`order\`
      SET \`status\` = ?, served_time = NOW()
      WHERE order_id = ?
      `,
      ['served', req.params.orderId]
    )
    // res.send('Success')
    await conn.commit()
    res.status(200).send();
  }
  catch (err) {
    await conn.rollback()
    return res.status(500).json(err);
  }
  finally {
    conn.release()
  }

})

// delete order and the relative to
router.delete('/order/:orderId/cancel', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `DELETE FROM order_item
      WHERE order_id = ?;`,
      [req.params.orderId]
    )

    const [row2, field2] = await conn.query(
      `SELECT serviced_id
      FROM \`order\`
      WHERE order_id = ?`,
      [req.params.orderId]
    )
    var serviced_id = row2[0].serviced_id;

    const [row3, field3] = await conn.query(
      `UPDATE \`table\`
      SET \`status\` = 'ready'
      WHERE table_id = (SELECT table_id
        FROM \`order\`
        WHERE order_id = ?);`,
      [req.params.orderId]
    )

    const [row4, field4] = await conn.query(
      `DELETE FROM \`order\`
      WHERE order_id = ?;`,
      [req.params.orderId]
    )

    const [row5, field5] = await conn.query(
      `DELETE FROM serviced_customer
      WHERE serviced_id = ?;`,
      [serviced_id]
    )

    await conn.commit()
    res.send('Success')
  }
  catch (err) {
    await conn.rollback()
    return res.status(500).json(err)
  }
  finally {
    conn.release()
  }
})

// set order status to 'completed'
router.post('/order/:orderId/completed', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {

    const [row1, field1] = await conn.query(
      `UPDATE \`table\`
      SET \`status\` = 'ready'
      WHERE table_id = (SELECT table_id
        FROM \`order\`
        WHERE order_id = ?)`,
      [req.params.orderId]
    )

    const [row2, field2] = await conn.query(
      `UPDATE serviced_customer
      SET check_out = NOW()
      WHERE serviced_id = (SELECT serviced_id
        FROM \`order\`
        WHERE order_id = ?)`,
      [req.params.orderId]
    )

    const [row3, field3] = await conn.query(
      `UPDATE \`order\`
      SET \`status\` = 'completed'
      WHERE order_id = ?`,
      [req.params.orderId]
    )

    await conn.commit()
    res.send('Success')
  }
  catch {
    await conn.rollback()
    return res.status(500).json(err)
  }
  finally {
    conn.release()
  }
})

// add new menu
router.post('/menu', async (req, res) => {
  var menu_name = req.body.menu_name
  var menu_price = req.body.menu_price
  var member_price = req.body.member_price
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [row1, field1] = await conn.query(
      `INSERT INTO menu (menu_name, menu_price, member_price, create_date, menu_status)
      VALUES(?,?,?,NOW(),?)`,
      [menu_name, menu_price, member_price, 'ready']
    )

    const [menu, field] = await conn.query(
      `SELECT *
      FROM menu
      WHERE menu_id = ?`,
      [row1.insertId]
    )
    menu[0].create_date = formatDate(menu[0].create_date)
    await conn.commit()
    res.json({ menus: menu })
  }
  catch (err) {
    await conn.rollback()
    return res.status(500).json(err)
  }
  finally {
    conn.release()
  }
})

// update menu
router.put('/menu/:menuId', async (req, res) => {
  var menu_name = req.body.menu_name
  var menu_price = req.body.menu_price
  var member_price = req.body.member_price
  var menu_status = req.body.menu_status

  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [menu, field] = await conn.query(
      `UPDATE menu
      SET menu_name = ?, menu_price = ?, member_price = ?, menu_status = ?
      WHERE menu_id = ?`,
      [menu_name, menu_price, member_price, menu_status, req.params.menuId]
    )

    await conn.commit()
    res.json({
      menus: {
        menu_name: menu_name,
        menu_price: menu_price,
        member_price: member_price,
        menu_status: menu_status
      }
    })
  }
  catch (err) {
    await conn.rollback()
    return res.status(500).json(err)
  }
  finally {
    conn.release()
  }
})

// delete menu
router.delete('/menu/:menuId', async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [menu, field] = await conn.query(
      `UPDATE menu
      SET menu_status = 'deleted', delete_date = NOW()
      WHERE menu_id = ?`,
      [req.params.menuId]
    )
    await conn.commit()
    res.send("Succuess")
  }
  catch (err) {
    await conn.rollback()
    return res.status(500).json(err)
  }
  finally {
    conn.release()
  }

})

// update password
router.put('/account/:accountId/password', async (req, res) => {
  var body = req.body
  res.send()
})

exports.router = router