import Stock from '#models/stock'

export default class StockService {
  static async getAllStocks() {
    return await Stock.all()
  }

  static async getStockByType(type: 'bulog' | 'pasar' | 'general') {
    const stock = await Stock.findBy('type', type)
    if (!stock) {
      throw new Error(`Stock with type ${type} not found`)
    }
    return stock
  }

  static async updateStock(
    type: 'bulog' | 'pasar' | 'general',
    roughRice: number = 0,
    rice5kg: number = 0,
    rice10kg: number = 0,
    rice25kg: number = 0,
    rice50kg: number = 0,
    bran: number = 0,
    reject: number = 0,
    menir: number = 0
  ) {
    const stock = await Stock.findBy('type', type)

    if (stock) {
      stock.roughRice = stock.roughRice + roughRice
      stock.rice5kg = stock.rice5kg + rice5kg
      stock.rice10kg = stock.rice10kg + rice10kg
      stock.rice25kg = stock.rice25kg + rice25kg
      stock.rice50kg = stock.rice50kg + rice50kg
      stock.bran = stock.bran + bran
      stock.reject = stock.reject + reject
      stock.menir = stock.menir + menir
      await stock.save()
    } else {
      await Stock.create({
        type,
        roughRice,
        rice5kg,
        rice10kg,
        rice25kg,
        rice50kg,
        bran,
        reject,
        menir,
      })
    }
  }
}
