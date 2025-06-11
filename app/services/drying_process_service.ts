import DryingProcess from '#models/drying_process'

export default class DryingProcessService {
  static async getAllDryingProcesses() {
    return await DryingProcess.all()
  }

  static async storeDryingProcess(data: any) {
    const trx = await DryingProcess.create({
      type: data.type,
      quantity: data.quantity,
      numberOfSack: data.numberOfSack,
      responsiblePersonID: data.responsiblePersonID,
    })
    return trx
  }

  static async getDryingProcessById(id: number) {
    const trx = await DryingProcess.find(id)
    if (!trx) {
      throw new Error('Drying process not found')
    }
    return trx
  }

  static async updateDryingProcess(id: number, data: any) {
    const trx = await DryingProcess.findOrFail(id)
    trx.type = data.type || trx.type
    trx.quantity = data.quantity || trx.quantity
    trx.numberOfSack = data.numberOfSack || trx.numberOfSack
    trx.responsiblePersonID = data.responsiblePersonID || trx.responsiblePersonID
    await trx.save()
    return trx
  }

  static async deleteDryingProcess(id: number) {
    const trx = await DryingProcess.findOrFail(id)
    await trx.delete()
    return trx
  }
}
