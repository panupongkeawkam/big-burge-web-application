const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const customerRouter = require('./routes/customer')
const employeeRouter = require('./routes/employee')
app.use(customerRouter.router)
app.use(employeeRouter.router)

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`)
})