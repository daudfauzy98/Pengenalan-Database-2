import 'source-map-support/register'
import express from 'express'
import bodyParser from 'body-parser'
import { Pengguna, TipePengguna } from './mongoose_customers'

const penggunaRouter = express.Router()

async function initApp() {
   const modelPengguna = new Pengguna()
 
   penggunaRouter.use(bodyParser.json())

   penggunaRouter.post('/insert', async function(req, res, next) {
      try {
         await modelPengguna.buat(req.body)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })

   penggunaRouter.get('/show-all', async function(req, res, next) {
      let paraAkun: TipePengguna[]
      try {
         paraAkun = await modelPengguna.ambilSemua()
      } catch (error) {
         return next(error)
      }
      return res.send(paraAkun)
   })

   penggunaRouter.get('/:id', async function(req, res, next) {
      let akun: TipePengguna | null
      try {
         akun = await modelPengguna.ambilSesuaiID(req.params.id)
      } catch (error) {
         return next(error)
      }
      res.send(akun)
   })

   penggunaRouter.put('/:id', async function(req, res, next) {
      try {
         await modelPengguna.perbarui(req.params.id, req.body)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })

   penggunaRouter.delete('/:id', async function(req, res, next) {
      try {
         await modelPengguna.hapus(req.params.id)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })
}

initApp()

// Nama objek yang mewakili controller_customer untuk dapat di-import di file lain
export default penggunaRouter