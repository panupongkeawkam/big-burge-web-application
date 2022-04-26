const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json !important
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded !important
app.use(cors())

const customerRouter = require('./routes/customer')
const employeeRouter = require('./routes/employee')
app.use(customerRouter.router)
app.use(employeeRouter.router)

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`)
})