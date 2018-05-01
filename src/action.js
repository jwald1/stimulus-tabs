export function defineShowActions(controllerConstructor) {
  const tabs = controllerConstructor.tabs
  const prototype = controllerConstructor.prototype

  tabs.forEach((tabName) => {
    if (!(actionMethodName(tabName) in prototype)) {
      prototype[actionMethodName(tabName)] = function(e) {
        e && e.preventDefault()
        this.tabState.setSelectedTab(tabName)

        if (this.selectedTab !== this.previousTab) {
          this.showSelectedTabContent()
          this.addSelectedTabClass()

          this.selected()
          debugger
        }

      }
    }
  })
}

export function actionMethodName(tabName) {
  return 'show' + capitalize(tabName)
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
