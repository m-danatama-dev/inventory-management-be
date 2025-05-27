import router from '@adonisjs/core/services/router'
const PurchaseTransactionController = () => import('#controllers/purchase_transactions_controller')

export default function purchasesTransactionRoute() {
  router
    .group(() => {
      router.get('/', [PurchaseTransactionController, 'index'])
      router.post('/', [PurchaseTransactionController, 'store'])
      router.get('/:id', [PurchaseTransactionController, 'show'])
      router.put('/:id', [PurchaseTransactionController, 'update'])
      router.delete('/:id', [PurchaseTransactionController, 'delete'])
    })
    .prefix('/purchase-transactions')
}
