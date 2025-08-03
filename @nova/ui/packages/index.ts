import { withInstall } from './utils'
import Button from './components/Button.vue'

export const MyButton = withInstall(Button)
export default MyButton

export type User = {
  name: string
  age: number
}
