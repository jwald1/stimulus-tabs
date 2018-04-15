export function defineShowActions(controllerConstructor) {
  const tabs = controllerConstructor.tabs
  const prototype = controllerConstructor.prototype

  tabs.forEach((tabName) => {
    if (!(actionMethodName(tabName) in prototype)) {
      prototype[actionMethodName(tabName)] = function() {
        this.tabState.setSelectedTab(tabName)
        this.showSelectedTabContent()
        this.addSelectedTabClass()

        this.selected()
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
