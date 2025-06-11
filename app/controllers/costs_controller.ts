import { HttpContext } from '@adonisjs/core/http'
import CostService from '#services/cost_service'

export default class CostController {
  async index({ response }: HttpContext) {
    try {
      const costs = await CostService.getAllCosts()
      return response.ok({
        success: true,
        message: 'Costs retrieved successfully.',
        data: costs,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve costs.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const cost = await CostService.storeCost(data)
      return response.created({
        success: true,
        message: 'Cost created successfully.',
        data: cost,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create cost.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const cost = await CostService.getCostById(params.id)
      return response.ok({
        success: true,
        message: 'Cost retrieved successfully.',
        data: cost,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Cost not found.',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    try {
      const cost = await CostService.updateCost(params.id, data)
      return response.ok({
        success: true,
        message: 'Cost updated successfully.',
        data: cost,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to update cost.',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const cost = await CostService.deleteCost(params.id)
      return response.ok({
        success: true,
        message: 'Cost deleted successfully.',
        data: cost,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete cost.',
        error: error.message,
      })
    }
  }
}
