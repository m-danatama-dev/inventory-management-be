import router from '@adonisjs/core/services/router'
import authRoute from './auth_routes.js'
import saleTransactionRoute from './sale_transaction_routes.js'
import purchaseTrasactionRoute from './purchase_transaction_routes.js'
import dryingProcessRoutes from './drying_process_routes.js'
import storageProcessRoutes from './storage_process_routes.js'
import millingProcessRoutes from './milling_process_routes.js'
import stockRoutes from './stock_routes.js'

export default function v1Routes() {
  router
    .group(() => {
      authRoute()
      saleTransactionRoute()
      purchaseTrasactionRoute()
      stockRoutes()
      dryingProcessRoutes()
      storageProcessRoutes()
      millingProcessRoutes()
    })
    .prefix('/v1')
}
