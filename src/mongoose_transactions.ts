import mongoose from 'mongoose'

export type TipeTransaksi = {
   id_akun: object
   jumlah: number
   tanggal: Date
   deskripsi: string
}

export type DokumenTransaksi = mongoose.Document & TipeTransaksi
var Schema = mongoose.Schema

const SkemaTransaksi = new mongoose.Schema({
   id_akun: {type: Schema.Types.ObjectId, ref: 'account'},
   jumlah: { type: Number, required: true },
   tanggal: { type: Date, required: true },
   deskripsi: { type: String, required: true }
})

export class Transaksi {
   private model: mongoose.Model<DokumenTransaksi>

   constructor() {
      this.model = mongoose.model('account', SkemaTransaksi)
   }

   async buat(data: TipeTransaksi) {
      try {
         const hasil = await this.model.create(data)
      } catch (error) {
         throw error
      }
   }

   async ambilSemua() {
      let paraTransaksi: TipeTransaksi[]
      try {
         paraTransaksi = await this.model.find({})
      } catch (error) {
         throw error
      }
      return paraTransaksi
   }

   async ambilSesuaiID(idAkun: string) {
      let transaksi: TipeTransaksi | null
      try {
         transaksi = await this.model.findById(idAkun)
      } catch (error) {
         throw error
      }
      return transaksi
   }

   async perbarui(idAkun: string, dataAkun: Partial<TipeTransaksi>) {
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