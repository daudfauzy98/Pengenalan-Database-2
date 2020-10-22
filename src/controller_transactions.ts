import 'source-map-support/register'
import express from 'express'
import bodyParser from 'body-parser'
import { Transaksi, TipeTransaksi } from './mongoose_transactions'

const transaksiRouter = express.Router()

async function initApp() {
   const modelTransaksi = new Transaksi()
 
   transaksiRouter.use(bodyParser.json())

   transaksiRouter.post('/insert', async function(req, res, next) {
      try {
         await modelTransaksi.buat(req.body)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })

   transaksiRouter.get('/show-all', async function(req, res, next) {
      let paraAkun: TipeTransaksi[]
      try {
         paraAkun = await modelTransaksi.ambilSemua()
      } catch (error) {
         return next(error)
      }
      return res.send(paraAkun)
   })

   transaksiRouter.get('/:id', async function(req, res, next) {
      let akun: TipeTransaksi | null
      try {
         akun = await modelTransaksi.ambilSesuaiID(req.params.id)
      } catch (error) {
         return next(error)
      }
      res.send(akun)
   })

   transaksiRouter.put('/:id', async function(req, res, next) {
      try {
         await modelTransaksi.perbarui(req.params.id, req.body)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })

   transaksiRouter.delete('/:id', async function(req, res, next) {
      try {
         await modelTransaksi.hapus(req.params.id)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })
}

initApp()

// Nama objek yang mewakili controller_ untuk dapat di-import di file lain
export default transaksiRouter