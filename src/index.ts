//import 'source-map-support/register'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import akunRouter from './controller_accounts'
import penggunaRouter from './controller_customers'
import transaksiRouter from './controller_transactions'

const app = express()

mongoose.connect(`${ process.env.MONGODB_URI }`, { 
   useNewUrlParser: true, 
   useUnifiedTopology: true
}).then(() => {
   console.log('Connect to MongoDB database success!')
}).catch(() => {
   console.log('Failed to connect to MongoDB database')
})

app.use(express.json())

app.get('/', (req, res) => { res.json({ message: 'Success!' }) })

// App Akun
app.use('/akun', akunRouter)
app.use('/pengguna', penggunaRouter)
app.use('/transaksi', transaksiRouter)

/*app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
   res.status(500).send({ success: false, message: err.message })
})*/

app.listen(process.env.PORT || 3000, () => {
   console.log(`App listen on port ${ process.env.PORT || 3000}`)
})
