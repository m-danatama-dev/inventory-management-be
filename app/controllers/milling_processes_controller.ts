import { HttpContext } from '@adonisjs/core/http'
import MillingProcessService from '#services/milling_process_service'

export default class MillingProcessController {
  async index({ response }: HttpContext) {
    try {
      const millingProcesses = await MillingProcessService.getAllMillingProcesses()
      return response.ok({
        success: true,
        message: 'Milling processes retrieved successfully.',
        data: millingProcesses,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve milling processes.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const millingProcess = await MillingProcessService.storeMillingProcess(data)
      return response.created({
        success: true,
        message: 'Milling process created successfully.',
        data: millingProcess,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create milling process.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const millingProcess = await MillingProcessService.getMillingProcessById(params.id)
      return response.ok({
        success: true,
        message: 'Milling process retrieved successfully.',
        data: millingProcess,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Milling process not found.',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const millingProcess = await MillingProcessService.deleteMillingProcess(params.id)
      return response.ok({
        success: true,
        message: 'Milling process deleted successfully.',
        data: millingProcess,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete milling process.',
        error: error.message,
      })
    }
  }
}
