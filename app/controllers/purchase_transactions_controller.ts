import { HttpContext } from '@adonisjs/core/http'
import PurchaseTransactionService from '#services/purchase_transaction_service'

export default class PurchaseTransactionController {
  async index({ response }: HttpContext) {
    try {
      const purchaseTransactions = await PurchaseTransactionService.getAllTransactions()
      return response.ok({
        success: true,
        message: 'Purchase transactions retrieved successfully.',
        data: purchaseTransactions,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve purchase transactions.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const purchaseTransaction = await PurchaseTransactionService.storeTransaction(data)
      return response.created({
        success: true,
        message: 'Purchase transaction created successfully.',
        data: purchaseTransaction,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create purchase transaction.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const purchaseTransaction = await PurchaseTransactionService.getTransactionById(params.id)
      return response.ok({
        success: true,
        message: 'Purchase transaction retrieved successfully.',
        data: purchaseTransaction,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Purchase transaction not found.',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const purchaseTransaction = await PurchaseTransactionService.deleteTransaction(params.id)
      return response.ok({
        success: true,
        message: 'Purchase transaction deleted successfully.',
        data: purchaseTransaction,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete purchase transaction.',
        error: error.message,
      })
    }
  }
}
