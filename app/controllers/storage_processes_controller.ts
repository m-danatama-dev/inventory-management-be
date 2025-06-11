import { HttpContext } from '@adonisjs/core/http'
import StorageProcessService from '#services/storage_process_service'

export default class StorageProcessController {
  async index({ response }: HttpContext) {
    try {
      const storageProcesses = await StorageProcessService.getAllStorageProcesses()
      return response.ok({
        success: true,
        message: 'Storage processes retrieved successfully.',
        data: storageProcesses,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve storage processes.',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const storageProcess = await StorageProcessService.storeStorageProcess(data)
      return response.created({
        success: true,
        message: 'Storage process created successfully.',
        data: storageProcess,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to create storage process.',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const storageProcess = await StorageProcessService.getStorageProcessById(params.id)
      return response.ok({
        success: true,
        message: 'Storage process retrieved successfully.',
        data: storageProcess,
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Storage process not found.',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    try {
      const storageProcess = await StorageProcessService.updateStorageProcess(params.id, data)
      return response.ok({
        success: true,
        message: 'Storage process updated successfully.',
        data: storageProcess,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to update storage process.',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const storageProcess = await StorageProcessService.deleteStorageProcess(params.id)
      return response.ok({
        success: true,
        message: 'Storage process deleted successfully.',
        data: storageProcess,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to delete storage process.',
        error: error.message,
      })
    }
  }
}
