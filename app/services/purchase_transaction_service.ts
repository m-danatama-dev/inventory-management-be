import PurchaseTransaction from '#models/purchase_transaction'
import PurchaseItem from '#models/purchase_item'

export default class PurchaseTransactionService {
  static async getAllTransactions() {
    return await PurchaseTransaction.query().preload('items')
  }

  static async storeTransaction(data: any) {
    const purchaseTransaction = await PurchaseTransaction.create({
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
        purchaseTransactionId: purchaseTransaction.id,
      }
    })

    await PurchaseItem.createMany(items)

    return purchaseTransaction
  }

  static async getTransactionById(id: number) {
    const purchaseTransaction = await PurchaseTransaction.query()
      .where('id', id)
      .preload('items')
      .first()

    if (!purchaseTransaction) {
      throw new Error('Purchase transaction not found')
    }

    return purchaseTransaction
  }

  static async deleteTransaction(id: number) {
    const purchaseTransaction = await PurchaseTransaction.findOrFail(id)
    await PurchaseItem.query().where('purchaseTransactionId', purchaseTransaction.id).delete()
    await purchaseTransaction.delete()
    return purchaseTransaction
  }
}
