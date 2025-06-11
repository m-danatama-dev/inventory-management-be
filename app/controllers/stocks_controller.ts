import { HttpContext } from '@adonisjs/core/http'
import StockService from '#services/stock_service'

export default class StocksController {
  async index({ response }: HttpContext) {
    try {
      const stocks = await StockService.getAllStocks()
      return response.ok({
        success: true,
        message: 'Stocks retrieved successfully.',
        data: stocks,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve stocks.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const stock = await StockService.getStockByType(params.type)
      return response.ok({
        success: true,
        message: 'Stock retrieved successfully.',
        data: stock,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Stock not found.',
        error: error.message,
      })
    }
  }
}
