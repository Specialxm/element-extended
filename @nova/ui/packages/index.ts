import { withInstall } from './utils'
import button from './components/NovaButton.vue'

const NovaButton = withInstall(button)

export { NovaButton }

export type User = {
  name: string
  age: number
}
