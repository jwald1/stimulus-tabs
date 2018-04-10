# Stimulus Tabs

### A simple tabs controller for Stimulus.js

#### Please call `super` in `connect` or `initialize` callbacks if you use them.
## Basic Usage

First run ` yarn add stimulus-tabs` to install

### Controller
In your controller `extent` tabs-controller

```javascript
// controllers/my_tabs_controller.js

import { TabsController } from 'stimulus-tabs'

export default class extends TabsController {
}
```

Add your tabs to the tabs array:
```javascript
export default class extends TabsController {
  static tabs = ['business', 'personal'] // this can be any name
}
```

Stimulus-tabs will define two action methods `showBusinessTab` and `showPersonalTab` which will show their corresponding tab's target

You can also have a css class set on a selected by defining `selectedTabClass` as such

```javascript
export default class extends TabsController {
  static tabs = ['business', 'personal'] // this can be any name
  static selectedTabClass = "CLASSNAME"
}
```

### HTML

```HTML
<div data-controller="my-tabs">
  <a data-action="my-tabs#showBusinessTab" href="#">Business tab</a>
  <a data-action="my-tabs#showPersonalTab" href="#">Personal</a>

  <div class="tabs-content">
    <div data-target="my-tabs.businessTab">...</div>
    <div data-target="my-tabs.personalTab">...</div>
  </div>
</div>
```
Now as we click on a tab, that tab's content is revealed.
That's all you need to have functional tabs.

### Initial tab

By default the first tab name in tab's array will be the first tab. For example if you have
`static tabs ['business', 'personal']` business will be the first tab.

You can also set the first tab in the HTML as such:

```HTML
<div data-controller="my-tabs" data-my-tabs-selected-tab="personal">
```
### Getters

There are four getters which you can use (in a callback for example)

1. `selectedTabContent` returns the selected tab's content element (the target)
2. `selectedTab` returns the selected tab element (button for example)
3. `previousSelectedTabContent` previous returns the selected tab's content element (the target)
4. `previousSelectedTab` returns the previous selected tab element (button for example)

### callback

There is a `selected` callback which is called when one selects a tab

```javascript
selected() {
  const htmlContent = fetchSomeData()

  this.selectedTabContent.appendChild(htmlContent)
}
```

For initial state please use Stimulus' `connect` callback, but you must call `super`

### TODO

Write tests

### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jwald1/stimulus-tabs. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### License
This package is available as open source under the terms of the MIT License.
