const express = require('express')
const pool = require('../config')

router = express.Router()

// employee login
router.post('/manager/login', async (req, res) => {
  var body = req.body
  res.send()
})

// get all menu
router.get('/menus', async (req, res) => {
  // need all menus, except deleted menu
  res.json()
})

// get all table
router.get('/tables', async (req, res) => {
  // need all table with order in each table (if exists)
  res.json()
})

// get order detail
router.get('/order/:orderId', async (req, res) => {
  // need all order item in order and customer data of order
  res.json()
})

// set order status to 'served'
router.put('/order/:orderId/serve', async (req, res) => {
  res.send()
})

// delete order and the relative to
router.put('/order/:orderId/cancel', async (req, res) => {
  res.send()
})

// set order status to 'completed'
router.post('/order/:orderId/completed', async (req, res) => {
})

// add new menu
router.post('/menu', async (req, res) => {
  res.json()
})

// update menu
router.put('/menu/:menuId', async (req, res) => {
  res.json()
})

// delete menu
router.delete('/menu/:menuId', async (req, res) => {
  res.send()
})

// update password
router.put('/account/:accountId/password', async (req, res) => {
  var body = req.body
  res.send()
})

exports.router = router