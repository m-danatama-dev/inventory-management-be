import router from '@adonisjs/core/services/router'
const DryingProceController = () => import('#controllers/drying_proces_controller')

export default function dryingProceRoutes() {
  router
    .group(() => {
      router.get('/', [DryingProceController, 'index'])
      router.post('/', [DryingProceController, 'store'])
      router.get('/:id', [DryingProceController, 'show'])
      router.put('/:id', [DryingProceController, 'update'])
      router.delete('/:id', [DryingProceController, 'delete'])
    })
    .prefix('/drying-processes')
}
