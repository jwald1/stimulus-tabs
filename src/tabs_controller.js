import { Controller } from "stimulus"
import { defineShowActions } from "./action"
import { TabState } from "./tab_state"

const defaultSelectedTabClass = "selected-tab"

export default class TabsController extends Controller {
  static tabs = [] // overwirde in subclass
  static selectedTabClass = "" // overwirde in subclass

  initialize() {
    defineShowActions(this)

    this._tabState = new TabState(this)
  }

  connect() {
    if (this._tabs.length > 0) {
      this._hideTabs()
      this._tabState.setSelectedTab(this._initialTabName, false)
      this._showSelectedTabContent()
      this._addSelectedTabClass()
    }
  }

  selected() {
    // overwirde in subclass
  }

  get selectedContent() {
    return this._tabState.selectedContent
  }

  get previousContent() {
    return this._tabState.previousContent
  }

  get selectedTab() {
    return this._tabState.selectedTab
  }

  get previousTab() {
    return this._tabState.previousTab
  }

  _hideTabs() {
    this._tabs.forEach(tabName => {
      if (this._initialTabName === tabName) {
        return
      }
      this._hideContent(this.targets.find(tabName))
    })
  }

  get _initialTabName() {
    return this._tabState.selectedTabName || this._tabs[0]
  }

  get _tabs() {
    const tabsDefinedOnElement = this.element.dataset.tabs

    if (tabsDefinedOnElement) {
      return tabsDefinedOnElement.trim().split(/\s+/)
    } else {
      this.constructor.tabs
    }
  }

  get _selectedTabClass() {
    return (
      this.element.dataset.selectedTabClass ||
      this.constructor.selectedTabClass ||
      defaultSelectedTabClass
    )
  }

  _showSelectedTabContent() {
    this._showContent(this.selectedContent)
    this._hideContent(this.previousContent)
  }

  _hideContent(el) {
    el && (el.style.display = "none")
  }

  _showContent(el) {
    el && (el.style.display = "")
  }

  _addSelectedTabClass() {
    this.selectedTab.classList.add(this._selectedTabClass)
    this._removeSelectedTabClassFromPreviousTab()
  }

  _removeSelectedTabClassFromPreviousTab() {
    this.previousTab &&
      this.previousTab.classList.remove(this._selectedTabClass)
  }
}

export { TabsController }
