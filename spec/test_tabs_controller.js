import { TabsController } from '../src/index'

export class TestTabsController extends TabsController {
  static tabs = ['business', 'personal']
  static selectedTabClass = 'selected'
}
