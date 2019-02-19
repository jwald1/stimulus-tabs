# Stimulus Tabs

### A simple tabs controller for Stimulus.js

[Codepen Demo](https://codepen.io/jwald1/pen/EEqxdg)

## Basic Usage

First run `yarn add stimulus-tabs` to install

### Setup

```
import { Application } from "stimulus"
import TabsController from 'stimulus-tabs'

const application = Application.start()
application.register("my-tabs", TabsController)
```

### HTML

Define each tab in `data-tabs` separate each value with a space.

```HTML
<div data-controller="my-tabs" data-tabs="business personal"
      <!-- default is selected-tab -->
     data-selected-tab-class="selected-tab"
>
  <a data-action="my-tabs#showBusiness" href="#">Business tab</a>
  <a data-action="my-tabs#showPersonal" href="#">Personal</a>

  <div class="tabs-content">
    <div data-target="my-tabs.business">...</div>
    <div data-target="my-tabs.personal">...</div>
  </div>
</div>
```

Now as we click on a tab, that tab's content is revealed.
That's all you need to have functional tabs.

### Initial tab

By default the first tab name defined in `data-tabs` will be the first tab. For example if you have
`data-tabs="business personal"` business will be the first tab.

You can also set the first tab in the like so:

```HTML
<div data-controller="my-tabs" data-my-tabs-selected-tab="personal">
```

## Callback

There is a `selected` callback which is called when one selects a tab

To utilize it, you will need to `extend` `TabsController`

```javascript
export default class extends TabsController {
  selected() {
    const htmlContent = fetchSomeData()

    this.selectedContent.appendChild(htmlContent)
  }
}
```

## Geters

There are four getters which you can use (in a callback for example)

1. `this.selectedContent` returns the selected tab's content element (the target)
2. `this.selectedTab` returns the selected tab element (button for example)
3. `this.previousContent` previous returns the selected tab's content element (the target)
4. `this.previousTab` returns the previous tab element (button for example)

For initial state please use Stimulus' `connect` callback, but you must call `super`

### CSS

Please don't hide the content elements with CSS or it won't work.
You don't need any css for the tabs to work.

### TODO

Write tests

### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jwald1/stimulus-tabs. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### License

This package is available as open source under the terms of the MIT License.
