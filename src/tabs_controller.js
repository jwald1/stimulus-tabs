import { Controller } from "stimulus"
import { defineShowActions } from './action'
import { TabState } from './tab_state'

export class TabsController extends Controller {
  static tabs = [] // overwirde in subclass
  static selectedTabClass = '' // overwirde in subclass

  initialize() {
    defineShowActions(this.constructor)

    this.tabState = new TabState(this)
  }

  connect() {
    if (this.constructor.tabs.length > 0) {
      this.hideTabs()
      this.tabState.setSelectedTab(this.initialTabName, false)
      this.showSelectedTabContent()
      this.addSelectedTabClass()
    }
  }

  get selectedContent() {
    return this.tabState.selectedContent
  }

  get previousContent() {
    return this.tabState.previousContent
  }

  get selectedTab() {
    return this.tabState.selectedTab
  }

  get previousTab() {
    return this.tabState.previousTab
  }

  hideTabs() {
    this.constructor.tabs.forEach(tabName => {
      if (this.initialTabName === tabName) {
        return
      }
        this.hideContent(this.targets.find(tabName))
    })
  }

  get initialTabName() {
    return this.tabState.selectedTabName || this.constructor.tabs[0]
  }

  showSelectedTabContent() {
    this.showContent(this.selectedContent)
    this.hideContent(this.previousContent)
  }

  hideContent(el) {
    el && (el.style.display = 'none')
  }

  showContent(el) {
    el && (el.style.display = '')
  }


  addSelectedTabClass() {
    if (this.isSelectedTabClassDefined()) {
      this.selectedTab.classList.add(this.constructor.selectedTabClass)
      this.removeSelectedTabClassFromPreviousTab()
    }
  }

  removeSelectedTabClassFromPreviousTab() {
    this.previousTab && this.previousTab.classList.remove(this.constructor.selectedTabClass)
  }

  isSelectedTabClassDefined() {
    return !!this.constructor.selectedTabClass
  }

  selected() {
    // overwirde in subclass
  }
}
