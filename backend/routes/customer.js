const express = require('express')
const pool = require('../config')

router = express.Router()

// customer login
router.post('/table/:tableId/login', async (req, res) => {
  // validation then create new order and serviced_customer
  var body = req.body
  res.send()
})

// customer as guest
router.post('/table/:tableId/guest', async (req, res) => {
  // create new order and serviced_customer
  res.send()
})

// get order status
router.get('/table/:tableId/status', async (req, res) => {
  res.json({ status: null })
})

// get order, orderItem, menus by table id
router.get('/table/:tableId/order', async (req, res) => {
  res.json()
})

// add new item into order
router.post('/order/:orderId/add', async (req, res) => {
  var body = req.body
  res.json()
})

// delete item from order
router.delete('/order/:orderId/:itemNo/delete', async (req, res) => {
  res.send()
})

// decrease amount of item from order
router.put('/order/:orderId/:itemNo/decrease', async (req, res) => {
  res.send()
})

// increase amount of item in order
router.put('/order/:orderId/:itemNo/increase', async (req, res) => {
  res.send()
})

// delete all item from order
router.delete('/order/:orderId/clear', async (req, res) => {
  send()
})

// confirm ordering for order
router.post('/order/:orderId/confirm', async (req, res) => {
  res.send()
})

// create bill and return
router.post('/table/:tableId/billing', async (req, res) => {
  res.json()
})

exports.router = router