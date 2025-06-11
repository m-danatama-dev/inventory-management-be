import router from '@adonisjs/core/services/router'
const CostsController = () => import('#controllers/costs_controller')

export default function costRoutes() {
  router
    .group(() => {
      router.get('/', [CostsController, 'index'])
      router.post('/', [CostsController, 'store'])
      router.get('/:id', [CostsController, 'show'])
      router.put('/:id', [CostsController, 'update'])
      router.delete('/:id', [CostsController, 'delete'])
    })
    .prefix('/costs')
}
