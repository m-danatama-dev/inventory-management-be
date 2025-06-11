import Cost from '#models/cost'

export default class CostService {
  static async getAllCosts() {
    return await Cost.all()
  }

  static async storeCost(data: any) {
    const cost = await Cost.create({
      name: data.name,
      price: data.price,
      responsiblePersonID: data.responsiblePersonID,
    })
    return cost
  }

  static async getCostById(id: number) {
    const cost = await Cost.find(id)
    if (!cost) {
      throw new Error('Cost not found')
    }
    return cost
  }

  static async updateCost(id: number, data: any) {
    const cost = await Cost.findOrFail(id)
    cost.name = data.name || cost.name
    cost.price = data.price || cost.price
    cost.responsiblePersonID = data.responsiblePersonID || cost.responsiblePersonID
    await cost.save()
    return cost
  }

  static async deleteCost(id: number) {
    const cost = await Cost.findOrFail(id)
    await cost.delete()
    return cost
  }
}
