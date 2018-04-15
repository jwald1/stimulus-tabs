import { actionMethodName } from './action'

export class TabState {
  constructor(controller) {
    this.controller = controller
  }

  get selectedContent() {
    return this.findContent(this.selectedTabName)
  }

  get previousContent() {
    return this.findContent(this.previousTabName)
  }

  get selectedTab() {
    return this.findTab(this.selectedTabName)
  }

  get previousTab() {
    const tabName = this.previousTabName
    return tabName && this.findTab(tabName)
  }

  setSelectedTab(tabName, setPrevious = true) {
    if (setPrevious) {
      this.previousTab = this.selectedTabName
    }

    this.selectedTab = tabName
  }

  set previousTab(tabName) {
    this.data.set('previousTab', tabName)
  }

  set selectedTab(tabName) {
    this.data.set('selectedTab', tabName)
  }

  get selectedTabName() {
    return this.data.get('selectedTab')
  }

  get previousTabName() {
    return this.data.get('previousTab')
  }

  findContent(tabName) {
    return this.targets.find(tabName)
  }

  findTab(tabName) {
    const selector = this.tabSelector(tabName)
    return this.element.querySelector(selector)
  }

  tabSelector(tabName) {
    return `[data-action$='${this.identifier}#${actionMethodName(tabName)}']`
  }

  get identifier() {
    return this.controller.identifier
  }

  get element() {
    return this.controller.element
  }

  get data() {
    return this.controller.data
  }

  get targets() {
    return this.controller.targets
  }
}
