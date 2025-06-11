import { HttpContext } from '@adonisjs/core/http'
import SaleTransactionService from '#services/sale_transaction_service'

export default class SaleTransactionController {
  async index({ response }: HttpContext) {
    try {
      const saleTransactions = await SaleTransactionService.getAllTransactions()
      return response.ok({
        success: true,
        message: 'Sale transactions retrieved successfully.',
        data: saleTransactions,
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
      const saleTransaction = await SaleTransactionService.storeTransaction(data)
      return response.created({
        success: true,
        message: 'Sale transaction created successfully.',
        data: saleTransaction,
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
      const saleTransaction = await SaleTransactionService.getTransactionById(params.id)
      return response.ok({
        success: true,
        message: 'Sale transaction retrieved successfully.',
        data: saleTransaction,
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
      const saleTransaction = await SaleTransactionService.updateTransaction(params.id, data)
      return response.ok({
        success: true,
        message: 'Sale transaction updated successfully.',
        data: saleTransaction,
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
      const saleTransaction = await SaleTransactionService.deleteTransaction(params.id)
      return response.ok({
        success: true,
        message: 'Sale transaction deleted successfully.',
        data: saleTransaction,
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
