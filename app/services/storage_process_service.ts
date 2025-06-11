import StorageProcess from '#models/storage_process'
import StockService from './stock_service.js'

export default class StorageProcessService {
  static async getAllStorageProcesses() {
    return await StorageProcess.all()
  }

  static async storeStorageProcess(data: any) {
    const storageProcess = await StorageProcess.create({
      quantity: data.quantity,
      numberOfSack: data.numberOfSack,
      responsiblePersonID: data.responsiblePersonID,
      type: data.type,
    })
    await StockService.updateStock(data.type, data.quantity, 0, 0, 0, 0, 0, 0, 0)
    return storageProcess
  }

  static async getStorageProcessById(id: number) {
    const storageProcess = await StorageProcess.find(id)
    if (!storageProcess) {
      throw new Error('Storage process not found')
    }
    return storageProcess
  }

  static async updateStorageProcess(id: number, data: any) {
    const storageProcess = await StorageProcess.findOrFail(id)
    storageProcess.quantity = data.quantity || storageProcess.quantity
    storageProcess.numberOfSack = data.numberOfSack || storageProcess.numberOfSack
    storageProcess.responsiblePersonID =
      data.responsiblePersonID || storageProcess.responsiblePersonID
    storageProcess.type = data.type || storageProcess.type
    await storageProcess.save()

    await StockService.updateStock(data.type, data.quantity)
    return storageProcess
  }

  static async deleteStorageProcess(id: number) {
    const storageProcess = await StorageProcess.findOrFail(id)
    await storageProcess.delete()
    await StockService.updateStock(storageProcess.type, -storageProcess.quantity)
    return storageProcess
  }
}
