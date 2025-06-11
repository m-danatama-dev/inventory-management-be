import MillingProcess from '#models/milling_process'
import MillingResult from '#models/milling_result'
import StockService from '#services/stock_service'

export default class MillingProcessService {
  static async getAllMillingProcesses() {
    return await MillingProcess.all()
  }

  static async storeMillingProcess(data: any) {
    const millingProcess = await MillingProcess.create({
      type: data.type,
      quantity: data.quantity,
      numberOfSack: data.numberOfSack,
      responsiblePersonID: data.responsiblePersonID,
    })

    const millingResult = await MillingResult.create({
      rice5Kg: data.rice5Kg,
      rice10Kg: data.rice10Kg,
      rice25Kg: data.rice25Kg,
      rice50Kg: data.rice50Kg,
      bran: data.bran,
      reject: data.reject,
      menir: data.menir,
      total: data.total,
    })

    millingProcess.resultId = millingResult.id
    await millingProcess.save()

    await StockService.updateStock(
      data.type,
      -data.quantity,
      data.rice5Kg,
      data.rice10Kg,
      data.rice25Kg,
      data.rice50Kg,
      data.bran,
      data.reject,
      data.menir
    )

    await StockService.updateStock('general', 0, 0, 0, 0, 0, data.bran, data.reject, data.menir)

    return millingProcess
  }

  static async getMillingProcessById(id: number) {
    const millingProcess = await MillingProcess.query().where('id', id).first()

    if (!millingProcess) {
      throw new Error('Milling process not found')
    }

    return millingProcess
  }

  static async deleteMillingProcess(id: number) {
    const millingProcess = await MillingProcess.findOrFail(id)
    const millingResult = await MillingResult.findOrFail(millingProcess.resultId)

    await MillingResult.query().where('id', millingProcess.resultId).delete()
    await millingProcess.delete()

    await StockService.updateStock(
      millingProcess.type,
      millingProcess.quantity,
      -millingResult.rice5Kg,
      -millingResult.rice10Kg,
      -millingResult.rice25Kg,
      -millingResult.rice50Kg,
      -millingResult.bran,
      -millingResult.reject,
      -millingResult.menir
    )

    await StockService.updateStock(
      'general',
      0,
      0,
      0,
      0,
      0,
      -millingResult.bran,
      -millingResult.reject,
      -millingResult.menir
    )

    return millingProcess
  }
}
