const express = require("express")
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('this is expense-tracker project initial.')
})

app.listen(port, () =>{
  console.log(`app is running on localhost:${port}`)
})

