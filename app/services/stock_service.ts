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
    rice5Kg: number = 0,
    rice10Kg: number = 0,
    rice25Kg: number = 0,
    rice50Kg: number = 0,
    bran: number = 0,
    reject: number = 0,
    menir: number = 0
  ) {
    const stock = await Stock.findBy('type', type)
    if (stock) {
      stock.roughRice = stock.roughRice + roughRice
      stock.rice5Kg = stock.rice5Kg + rice5Kg
      stock.rice10Kg = stock.rice10Kg + rice10Kg
      stock.rice25Kg = stock.rice25Kg + rice25Kg
      stock.rice50Kg = stock.rice50Kg + rice50Kg
      stock.bran = stock.bran + bran
      stock.reject = stock.reject + reject
      stock.menir = stock.menir + menir
      await stock.save()
    } else {
      await Stock.create({
        type,
        roughRice,
        rice5Kg,
        rice10Kg,
        rice25Kg,
        rice50Kg,
        bran,
        reject,
        menir,
      })
    }
  }
}
