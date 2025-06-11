import router from '@adonisjs/core/services/router'
const StorageProcessesController = () => import('#controllers/storage_processes_controller')

export default function storageProcessRoutes() {
  router
    .group(() => {
      router.get('/', [StorageProcessesController, 'index'])
      router.post('/', [StorageProcessesController, 'store'])
      router.get('/:id', [StorageProcessesController, 'show'])
      router.put('/:id', [StorageProcessesController, 'update'])
      router.delete('/:id', [StorageProcessesController, 'delete'])
    })
    .prefix('/storage-processes')
}
