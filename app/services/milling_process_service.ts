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
      rice5kg: data.rice5kg,
      rice10kg: data.rice10kg,
      rice25kg: data.rice25kg,
      rice50kg: data.rice50kg,
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
      data.rice5kg,
      data.rice10kg,
      data.rice25kg,
      data.rice50kg,
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
      -millingResult.rice5kg,
      -millingResult.rice10kg,
      -millingResult.rice25kg,
      -millingResult.rice50kg,
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
