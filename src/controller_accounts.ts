import 'source-map-support/register'
import express from 'express'
import bodyParser from 'body-parser'
import { Akun, TipeAkun } from './mongoose_accounts'

const akunRouter = express.Router()

async function initApp() {
   const modelAkun = new Akun()
 
   akunRouter.use(bodyParser.json())

   akunRouter.post('/insert', async function(req, res, next) {
      try {
         await modelAkun.buat(req.body)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })

   akunRouter.get('/show-all', async function(req, res, next) {
      let paraAkun: TipeAkun[]
      try {
         paraAkun = await modelAkun.ambilSemua()
      } catch (error) {
         return next(error)
      }
      return res.send(paraAkun)
   })

   akunRouter.get('/:id', async function(req, res, next) {
      let akun: TipeAkun | null
      try {
         akun = await modelAkun.ambilSesuaiID(req.params.id)
      } catch (error) {
         return next(error)
      }
      res.send(akun)
   })

   akunRouter.put('/:id', async function(req, res, next) {
      try {
         await modelAkun.perbarui(req.params.id, req.body)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })

   akunRouter.delete('/:id', async function(req, res, next) {
      try {
         await modelAkun.hapus(req.params.id)
      } catch (error) {
         return next(error)
      }
      res.send({ success: true })
   })
}

initApp()

// Nama objek yang mewakili controller_account untuk dapat di-import di file lain
export default akunRouter