import SaleTransaction from '#models/sale_transaction'
import SaleItem from '#models/sale_item'
import StockService from '#services/stock_service'

export default class SaleTransactionService {
  static async getAllTransactions() {
    return await SaleTransaction.query().preload('items')
  }

  static async storeTransaction(data: any) {
    const saleTransaction = await SaleTransaction.create({
      buyerName: data.buyerName,
      origin: data.origin,
      responsiblePersonID: data.responsiblePersonID,
      totalAmount: data.totalAmount,
      status: data.status,
    })

    const items = data.items.map((item: any) => {
      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        saleTransactionId: saleTransaction.id,
      }
    })
    await SaleItem.createMany(items)

    for (let item of data.items) {
      await StockService.updateStock(
        data.type,
        0,
        item.name === 'rice5Kg' ? -item.quantity : 0,
        item.name === 'rice10Kg' ? -item.quantity : 0,
        item.name === 'rice25Kg' ? -item.quantity : 0,
        item.name === 'rice50Kg' ? -item.quantity : 0,
        item.name === 'bran' ? -item.quantity : 0,
        item.name === 'reject' ? -item.quantity : 0,
        item.name === 'menir' ? -item.quantity : 0
      )
    }

    return saleTransaction
  }

  static async getTransactionById(id: number) {
    const saleTransaction = await SaleTransaction.query().where('id', id).preload('items').first()
    if (!saleTransaction) {
      throw new Error('Sale transaction not found')
    }
    return saleTransaction
  }

  static async updateTransaction(id: number, data: any) {
    const saleTransaction = await SaleTransaction.findOrFail(id)
    saleTransaction.buyerName = data.buyerName || saleTransaction.buyerName
    saleTransaction.origin = data.origin || saleTransaction.origin
    saleTransaction.responsiblePersonID =
      data.responsiblePersonID || saleTransaction.responsiblePersonID
    saleTransaction.totalAmount = data.totalAmount || saleTransaction.totalAmount
    await saleTransaction.save()

    if (data.items) {
      await SaleItem.query().where('saleTransactionId', saleTransaction.id).delete()
      const items = data.items.map((item: any) => {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          saleTransactionId: saleTransaction.id,
        }
      })
      await SaleItem.createMany(items)
      for (let item of data.items) {
        await StockService.updateStock(
          data.type,
          0,
          item.name === 'rice5Kg' ? -item.quantity : 0,
          item.name === 'rice10Kg' ? -item.quantity : 0,
          item.name === 'rice25Kg' ? -item.quantity : 0,
          item.name === 'rice50Kg' ? -item.quantity : 0,
          item.name === 'bran' ? -item.quantity : 0,
          item.name === 'reject' ? -item.quantity : 0,
          item.name === 'menir' ? -item.quantity : 0
        )
      }
    }
    return saleTransaction
  }

  static async deleteTransaction(id: number) {
    const saleTransaction = await SaleTransaction.findOrFail(id)
    const items = await SaleItem.query().where('saleTransactionId', saleTransaction.id)
    await SaleItem.query().where('saleTransactionId', saleTransaction.id).delete()
    for (let item of items) {
      await StockService.updateStock(
        saleTransaction.type,
        0,
        item.name === 'rice5Kg' ? -item.quantity : 0,
        item.name === 'rice10Kg' ? -item.quantity : 0,
        item.name === 'rice25Kg' ? -item.quantity : 0,
        item.name === 'rice50Kg' ? -item.quantity : 0,
        item.name === 'bran' ? -item.quantity : 0,
        item.name === 'reject' ? -item.quantity : 0,
        item.name === 'menir' ? -item.quantity : 0
      )
    }

    await saleTransaction.delete()
    return saleTransaction
  }
}
