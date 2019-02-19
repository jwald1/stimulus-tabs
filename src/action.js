export function defineShowActions(controller) {
  const controllerConstructor = controller.constructor
  const prototype = controllerConstructor.prototype

  controller._tabs.forEach(tabName => {
    if (!(actionMethodName(tabName) in prototype)) {
      prototype[actionMethodName(tabName)] = function(e) {
        e && e.preventDefault()
        this._tabState.setSelectedTab(tabName)

        if (this.selectedTab !== this.previousTab) {
          this._showSelectedTabContent()
          this._addSelectedTabClass()

          this.selected()
        }
      }
    }
  })
}

export function actionMethodName(tabName) {
  return "show" + capitalize(tabName)
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
