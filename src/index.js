import { Controller } from "stimulus"

class TabsController extends Controller {
  static tabs = [] // overwirde in subclass

  initialize() {
    this.defineShowActions()
  }

  connect() {
    if (this.constructor.tabs.length !== 0) {
      this.tabNames.forEach(tabName => this.hideTab(tabName))
      this.showTab(this.initialTabName)
      this.currentTab = this.initialTabName

      this.initialSelected()
    }
  }

  get tabNames() {
    return this.constructor.tabs.filter(tabName => tabName !== this.initialTabName)
  }

  get initialTabName() {
    return this.data.get('currentTab') || this.constructor.tabs[0]
  }

  defineShowActions() {
    this.constructor.tabs.forEach((tabName) => {
      this['show' + this.capitalize(tabName)] = function() {
        this.previousTab = this.data.get('currentTab')
        this.currentTab = tabName

        this.hideTab(this.previousTab)
        this.showTab(this.currentTab)

        this.selected()
      }
    })
  }

  selected() {
    // overwirde in subclass
  }

  initialSelected() {
    // overwirde in subclass
  }

  capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  findTarget(elementOrSelector) {
    if (elementOrSelector instanceof Element) {
      return elementOrSelector
    }

    return this.targets.find(elementOrSelector)
  }

  hideTab(elementOrSelector) {
    this.findTarget(elementOrSelector).style.display = 'none'
  }

  showTab(elementOrSelector) {
    this.findTarget(elementOrSelector).style.display = ''
  }

  set previousTab(tabName) {
    this.data.set('previousTab', tabName)
  }

  set currentTab(tabName) {
    this.data.set('currentTab', tabName)
  }

  get previousTab() {
    const previousTab = this.data.get('previousTab')

    if (previousTab) {
      return this.targets.find(previousTab)
    }
  }

  get currentTab() {
    const currentTab = this.data.get('currentTab')

    if (currentTab) {
      return this.targets.find(currentTab)
    }
  }

  get currentTabButton() {
    const selector = `[data-action$='${this.identifier}#show${this.capitalize(this.data.get('currentTab'))}']`
    return this.element.querySelector(selector)
  }

  get previousTabButton() {
    const selector = `[data-action$='${this.identifier}#show${this.capitalize(this.data.get('previousTab'))}']`
    return this.element.querySelector(selector)
  }
}

export { TabsController }
