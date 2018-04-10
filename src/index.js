import { Controller } from "stimulus"

class TabsController extends Controller {
  static tabs = [] // overwirde in subclass
  static selectedTabClass = '' // overwirde in subclass
  static tabSuffix = 'Tab'

  initialize() {
    this.defineShowActions()
  }

  connect() {
    if (this.constructor.tabs.length !== 0) {
      this.hideTabs()
      this.showInitalTab()
    }
  }

  hideTabs() {
    this.constructor.tabs.filter(tabName => tabName !== this.initialTabName).
      forEach(tabName => {
        this.hideTabContent(tabName)
      })
  }

  showInitalTab() {
    this.selectedTab = this.initialTabName
    this.showTabContent(this.initialTabName)
  }

  get initialTabName() {
    return this.data.get('SelectedTab') || this.constructor.tabs[0]
  }

  defineShowActions() {
    this.constructor.tabs.forEach((tabName) => {
      this['show' + this.capitalize(tabName) + this.constructor.tabSuffix] = function() {
        this.previousSelectedTab = this.data.get('selectedTab')
        this.selectedTab = tabName

        this.hideTabContent(this.previousSelectedTabContent)
        this.showTabContent(this.selectedTabContent)

        this.selected()
      }
    })
  }

  selected() {
    // overwirde in subclass
  }

  capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  findTarget(elementOrSelector) {
    let element

    if (elementOrSelector instanceof Element) {
      element = elementOrSelector
    } else if (this.targets.has(elementOrSelector + this.constructor.tabSuffix)) {
      element = this.targets.find(elementOrSelector + this.constructor.tabSuffix)
    }

    return element
  }

  toggleTabVisibility(elementOrSelector, show) {
    const target = this.findTarget(elementOrSelector)

    if (target) {
      target.style.display = show ? '' : 'none'
    }
  }

  hideTabContent(elementOrSelector) {
    this.toggleTabVisibility(elementOrSelector, false)
  }

  showTabContent(elementOrSelector) {
    this.toggleTabVisibility(elementOrSelector, true)
    this.setSelectedTabClass()
  }

  setSelectedTabClass() {
    const selectedTabClass = this.constructor.selectedTabClass

    if (selectedTabClass && selectedTabClass.length > 0) {
      this.selectedTab.classList.add(selectedTabClass)

      if (this.previousSelectedTab) {
        this.previousSelectedTab.classList.remove(selectedTabClass)
      }
    }
  }

  set previousSelectedTab(tabName) {
    this.data.set('previousSelectedTab', tabName)
  }

  set selectedTab(tabName) {
    this.data.set('selectedTab', tabName)
  }

  get previousSelectedTabContent() {
    return this.tabContent('previousSelectedTab')
  }

  get selectedTabContent() {
    return this.tabContent('selectedTab')
  }

  tabContent(selectedOrPrevious) {
    const tabName = this.data.get(selectedOrPrevious)

    if (tabName) {
      return this.targets.find(tabName + this.constructor.tabSuffix)
    }
  }


  get selectedTab() {
    const selector = this.tabSelector('selected')

    return this.element.querySelector(selector)
  }

  get previousSelectedTab() {
    const selector = this.tabSelector('previousSelected')

    return this.element.querySelector(selector)
  }

  tabSelector(selectedOrPrevious) {
    const tabName = this.data.get(selectedOrPrevious + 'Tab')

    if (!tabName) {
      return
    }

    return `[data-action$='${this.identifier}#show${this.capitalize(tabName)}${this.constructor.tabSuffix}']`
  }
}

export { TabsController }
