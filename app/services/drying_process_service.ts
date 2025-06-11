import DryingProcess from '#models/drying_process'

export default class DryingProcessService {
  static async getAllDryingProcesses() {
    return await DryingProcess.all()
  }

  static async storeDryingProcess(data: any) {
    const dryingProcess = await DryingProcess.create({
      type: data.type,
      quantity: data.quantity,
      numberOfSack: data.numberOfSack,
      responsiblePersonID: data.responsiblePersonID,
    })
    return dryingProcess
  }

  static async getDryingProcessById(id: number) {
    const dryingProcess = await DryingProcess.find(id)
    if (!dryingProcess) {
      throw new Error('Drying process not found')
    }
    return dryingProcess
  }

  static async updateDryingProcess(id: number, data: any) {
    const dryingProcess = await DryingProcess.findOrFail(id)
    dryingProcess.type = data.type || dryingProcess.type
    dryingProcess.quantity = data.quantity || dryingProcess.quantity
    dryingProcess.numberOfSack = data.numberOfSack || dryingProcess.numberOfSack
    dryingProcess.responsiblePersonID =
      data.responsiblePersonID || dryingProcess.responsiblePersonID
    await dryingProcess.save()
    return dryingProcess
  }

  static async deleteDryingProcess(id: number) {
    const dryingProcess = await DryingProcess.findOrFail(id)
    await dryingProcess.delete()
    return dryingProcess
  }
}
