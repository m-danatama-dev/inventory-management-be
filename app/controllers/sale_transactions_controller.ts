import { HttpContext } from '@adonisjs/core/http'
import SaleTransactionService from '#services/sale_transaction_service'

export default class SaleTransactionController {
  async index({ response }: HttpContext) {
    try {
      const transactions = await SaleTransactionService.getAllTransactions()
      return response.ok({
        success: true,
        message: 'Sale transactions retrieved successfully.',
        data: transactions,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve sale transactions.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const transaction = await SaleTransactionService.storeTransaction(data)

      return response.created({
        success: true,
        message: 'Sale transaction created successfully.',
        data: transaction,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create sale transaction.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const transaction = await SaleTransactionService.getTransactionById(params.id)
      return response.ok({
        success: true,
        message: 'Sale transaction retrieved successfully.',
        data: transaction,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Sale transaction not found.',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    try {
      const transaction = await SaleTransactionService.updateTransaction(params.id, data)
      return response.ok({
        success: true,
        message: 'Sale transaction updated successfully.',
        data: transaction,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to update sale transaction.',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const transaction = await SaleTransactionService.deleteTransaction(params.id)
      return response.ok({
        success: true,
        message: 'Sale transaction deleted successfully.',
        data: transaction,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete sale transaction.',
        error: error.message,
      })
    }
  }
}
