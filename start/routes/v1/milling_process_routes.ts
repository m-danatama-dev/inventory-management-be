import router from '@adonisjs/core/services/router'
const MillingProcessesController = () => import('#controllers/milling_processes_controller')

export default function millingProcessRoutes() {
  router
    .group(() => {
      router.get('/', [MillingProcessesController, 'index'])
      router.post('/', [MillingProcessesController, 'store'])
      router.get('/:id', [MillingProcessesController, 'show'])
      router.put('/:id', [MillingProcessesController, 'update'])
      router.delete('/:id', [MillingProcessesController, 'delete'])
    })
    .prefix('/milling-processes')
}
