import SaleTransaction from '#models/sale_transaction'
import SaleItem from '#models/sale_item'

export default class SaleTransactionService {
  static async getAllTransactions() {
    return await SaleTransaction.query().preload('items')
  }

  static async storeTransaction(data: any) {
    console.log('Data received:', data)
    const trx = await SaleTransaction.create({
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
        saleTransactionId: trx.id,
      }
    })

    await SaleItem.createMany(items)

    return trx
  }

  static async getTransactionById(id: number) {
    const trx = await SaleTransaction.query().where('id', id).preload('items').first()

    if (!trx) {
      throw new Error('Sale transaction not found')
    }

    return trx
  }

  static async updateTransaction(id: number, data: any) {
    const trx = await SaleTransaction.findOrFail(id)
    trx.buyerName = data.buyerName || trx.buyerName
    trx.origin = data.origin || trx.origin
    trx.responsiblePersonID = data.responsiblePersonID || trx.responsiblePersonID
    trx.totalAmount = data.totalAmount || trx.totalAmount
    await trx.save()

    if (data.items) {
      await SaleItem.query().where('saleTransactionId', trx.id).delete()
      const items = data.items.map((item: any) => {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          saleTransactionId: trx.id,
        }
      })
      await SaleItem.createMany(items)
    }
    return trx
  }

  static async deleteTransaction(id: number) {
    const trx = await SaleTransaction.findOrFail(id)
    await SaleItem.query().where('saleTransactionId', trx.id).delete()
    await trx.delete()
    return trx
  }
}
