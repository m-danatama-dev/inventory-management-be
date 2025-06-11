import DryingProces from '#models/drying_proces'

export default class DryingProcesService {
  static async getAllDryingProcesses() {
    return await DryingProces.all()
  }

  static async storeDryingProce(data: any) {
    const trx = await DryingProces.create({
      type: data.type,
      quantity: data.quantity,
      numberOfSack: data.numberOfSack,
      responsiblePersonID: data.responsiblePersonID,
    })
    return trx
  }

  static async getDryingProceById(id: number) {
    const trx = await DryingProces.find(id)
    if (!trx) {
      throw new Error('Drying process not found')
    }
    return trx
  }

  static async updateDryingProce(id: number, data: any) {
    const trx = await DryingProces.findOrFail(id)
    trx.type = data.type || trx.type
    trx.quantity = data.quantity || trx.quantity
    trx.numberOfSack = data.numberOfSack || trx.numberOfSack
    trx.responsiblePersonID = data.responsiblePersonID || trx.responsiblePersonID
    await trx.save()
    return trx
  }

  static async deleteDryingProce(id: number) {
    const trx = await DryingProces.findOrFail(id)
    await trx.delete()
    return trx
  }
}
