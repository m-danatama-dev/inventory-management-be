import router from '@adonisjs/core/services/router'
const StocksController = () => import('#controllers/stocks_controller')

export default function stockRoutes() {
  router
    .group(() => {
      router.get('/', [StocksController, 'index'])
      router.get('/:type', [StocksController, 'show'])
    })
    .prefix('/stocks')
}
