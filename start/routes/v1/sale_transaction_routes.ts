import router from '@adonisjs/core/services/router'
const SaleTransactionController = () => import('#controllers/sale_transactions_controller')

export default function salesTransactionRoutes() {
  router
    .group(() => {
      router.get('/', [SaleTransactionController, 'index'])
      router.post('/', [SaleTransactionController, 'store'])
      router.get('/:id', [SaleTransactionController, 'show'])
      router.put('/:id', [SaleTransactionController, 'update'])
      router.delete('/:id', [SaleTransactionController, 'delete'])
    })
    .prefix('/sale-transactions')
}
