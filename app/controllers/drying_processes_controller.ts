import { HttpContext } from '@adonisjs/core/http'
import DryingProcessService from '#services/drying_process_service'

export default class DryingProcessesController {
  async index({ response }: HttpContext) {
    try {
      const dryingProcesses = await DryingProcessService.getAllDryingProcesses()
      return response.ok({
        success: true,
        message: 'Drying processes retrieved successfully.',
        data: dryingProcesses,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve drying processes.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const dryingProces = await DryingProcessService.storeDryingProcess(data)

      return response.created({
        success: true,
        message: 'Drying process created successfully.',
        data: dryingProces,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create drying process.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const dryingProces = await DryingProcessService.getDryingProcessById(params.id)
      return response.ok({
        success: true,
        message: 'Drying process retrieved successfully.',
        data: dryingProces,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Drying process not found.',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    try {
      const dryingProces = await DryingProcessService.updateDryingProcess(params.id, data)
      return response.ok({
        success: true,
        message: 'Drying process updated successfully.',
        data: dryingProces,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to update drying process.',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const dryingProces = await DryingProcessService.deleteDryingProcess(params.id)
      return response.ok({
        success: true,
        message: 'Drying process deleted successfully.',
        data: dryingProces,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete drying process.',
        error: error.message,
      })
    }
  }
}
