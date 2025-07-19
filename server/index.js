import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './controllers/index.js'

const app = express()
const port = 3142;


app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
    console.log(`Todo api app listening on port ${port}`)
})
