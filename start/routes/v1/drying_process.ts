import router from '@adonisjs/core/services/router'
const DryingProcessesController = () => import('#controllers/drying_processes_controller')

export default function dryingProceRoutes() {
  router
    .group(() => {
      router.get('/', [DryingProcessesController, 'index'])
      router.post('/', [DryingProcessesController, 'store'])
      router.get('/:id', [DryingProcessesController, 'show'])
      router.put('/:id', [DryingProcessesController, 'update'])
      router.delete('/:id', [DryingProcessesController, 'delete'])
    })
    .prefix('/drying-processes')
}
