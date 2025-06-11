import PurchaseTransaction from '#models/purchase_transaction'
import PurchaseItem from '#models/purchase_item'

export default class PurchaseTransactionService {
  static async getAllTransactions() {
    return await PurchaseTransaction.query().preload('items')
  }

  static async storeTransaction(data: any) {
    const trx = await PurchaseTransaction.create({
      supplierName: data.supplierName,
      origin: data.origin,
      responsiblePersonID: data.responsiblePersonID,
      totalAmount: data.totalAmount,
      status: data.status,
    })

    const items = data.items.map((item: any) => {
      return {
        quantity: item.quantity,
        numberOfSack: item.numberOfSack,
        type: item.type,
        price: item.price,
        total: item.total,
        purchaseTransactionId: trx.id,
      }
    })

    await PurchaseItem.createMany(items)

    return trx
  }

  static async getTransactionById(id: number) {
    const trx = await PurchaseTransaction.query().where('id', id).preload('items').first()

    if (!trx) {
      throw new Error('Purchase transaction not found')
    }

    return trx
  }

  static async updateTransaction(id: number, data: any) {
    const trx = await PurchaseTransaction.findOrFail(id)
    trx.supplierName = data.supplierName || trx.supplierName
    trx.origin = data.origin || trx.origin
    trx.responsiblePersonID = data.responsiblePersonID || trx.responsiblePersonID
    trx.totalAmount = data.totalAmount || trx.totalAmount
    await trx.save()

    if (data.items) {
      await PurchaseItem.query().where('PurchaseTransactionId', trx.id).delete()
      const items = data.items.map((item: any) => {
        return {
          quantity: item.quantity,
          numberOfSack: item.numberOfSack,
          type: item.type,
          price: item.price,
          total: item.total,
          purchaseTransactionId: trx.id,
        }
      })
      await PurchaseItem.createMany(items)
    }
    return trx
  }

  static async deleteTransaction(id: number) {
    const trx = await PurchaseTransaction.findOrFail(id)
    console.log('Deleting transaction:', trx.id)
    await PurchaseItem.query().where('purchaseTransactionId', trx.id).delete()
    await trx.delete()
    return trx
  }
}
