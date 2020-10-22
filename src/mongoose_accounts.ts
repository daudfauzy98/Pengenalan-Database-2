import mongoose from 'mongoose'

export type TipeAkun = {
   id_pengguna: object
   nomor_akun: string
   saldo: number
   tipe_akun: string
   tanggal_pembuatan: Date
}

export type DokumenAkun = mongoose.Document & TipeAkun
var Schema = mongoose.Schema

const SkemaAkun = new mongoose.Schema({
   id_pengguna: {type: Schema.Types.ObjectId, ref: 'customer'},
   nomor_akun: { type: String, required: true },
   saldo: { type: Number, required: true },
   tipe_akun: { type: String, required: true },
   tanggal_pembuatan: { type: Date, required: true }
})

export class Akun {
   private model: mongoose.Model<DokumenAkun>

   constructor() {
      this.model = mongoose.model('account', SkemaAkun)
   }

   async buat(data: TipeAkun) {
      try {
         const hasil = await this.model.create(data)
         console.log('Insert result %j', hasil)
      } catch (error) {
         throw error
      }
   }

   async ambilSemua() {
      let paraAkun: TipeAkun[]
      try {
         paraAkun = await this.model.find({})
      } catch (error) {
         throw error
      }
      return paraAkun
   }

   async ambilSesuaiID(idAkun: string) {
      let akun: TipeAkun | null
      try {
         akun = await this.model.findById(idAkun)
      } catch (error) {
         throw error
      }
      return akun
   }

   async perbarui(idAkun: string, dataAkun: Partial<TipeAkun>) {
      try {
         await this.model.findByIdAndUpdate(idAkun, { $set: dataAkun })
      } catch (error) {
         throw error
      }
   }

   async hapus(idAkun: string) {
      try {
         await this.model.findByIdAndDelete(idAkun)
      } catch (error) {
         throw error
      }
   }
}