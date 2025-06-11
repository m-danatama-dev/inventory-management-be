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
      type: data.type,
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

    if (data.type === 'general') {
      for (let item of data.items) {
        await StockService.updateStock(
          'general',
          0,
          0,
          0,
          0,
          0,
          item.name == 'bran' ? -item.quantity : 0,
          item.name == 'reject' ? -item.quantity : 0,
          item.name == 'menir' ? -item.quantity : 10
        )
      }
    } else {
      for (let item of data.items) {
        await StockService.updateStock(
          data.type,
          0,
          item.name == 'rice5Kg' ? -item.quantity : 0,
          item.name == 'rice10Kg' ? -item.quantity : 0,
          item.name == 'rice25Kg' ? -item.quantity : 0,
          item.name == 'rice50Kg' ? -item.quantity : 0,
          0,
          0,
          0
        )
      }
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

  static async deleteTransaction(id: number) {
    const saleTransaction = await SaleTransaction.findOrFail(id)
    const items = await SaleItem.query().where('saleTransactionId', saleTransaction.id)
    await SaleItem.query().where('saleTransactionId', saleTransaction.id).delete()

    for (let item of items) {
      await StockService.updateStock(
        saleTransaction.type,
        0,
        item.name === 'rice5Kg' ? item.quantity : 0,
        item.name === 'rice10Kg' ? item.quantity : 0,
        item.name === 'rice25Kg' ? item.quantity : 0,
        item.name === 'rice50Kg' ? item.quantity : 0,
        item.name === 'bran' ? item.quantity : 0,
        item.name === 'reject' ? item.quantity : 0,
        item.name === 'menir' ? item.quantity : 0
      )
    }

    for (let item of items) {
      await StockService.updateStock(
        'general',
        0,
        0,
        0,
        0,
        0,
        item.quantity * (item.name === 'bran' ? 1 : 0),
        item.quantity * (item.name === 'reject' ? 1 : 0),
        item.quantity * (item.name === 'menir' ? 1 : 0)
      )
    }

    await saleTransaction.delete()
    return saleTransaction
  }
}
