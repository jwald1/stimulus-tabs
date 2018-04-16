import { TabsController } from '../src/tabs_controller'

export class TestTabsController extends TabsController {
  static tabs = ['business', 'personal']
  static selectedTabClass = 'selected'
}
