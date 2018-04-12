import { Application } from 'stimulus'
import { TestTabsController } from './test_tabs_controller'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'
import sinonChai from 'sinon-chai'

chai.use(chaiDom)
chai.use(sinonChai)

before(function() {
  fixture.load('index.html')
  this._stimulusApp = Application.start()
  this._stimulusApp.register('test-tabs', TestTabsController)
  this.controller = this._stimulusApp.controllers[0]

  this.sandbox = sinon.createSandbox()
})

after(function() {
  this._stimulusApp.stop()
})

beforeEach(function(){
  this.controller.connect()
});


afterEach(function() {
  fixture.el.firstChild.removeAttribute('data-test-tabs-selected-tab')
  fixture.el.firstChild.removeAttribute('data-test-tabs-previous-selected-tab')
  this.sandbox.restore()
})

describe('initialize', function(){
  it('defines show actions for each tab', function(){
    const controller = new TestTabsController
    const methodNames = TestTabsController.tabs.map(tab => controller.actionMethodName(tab))

    controller.initialize()

    for (let methodName of methodNames) {
      expect(controller).to.respondTo(methodName)
    }
  })
})

describe('initial state', function(){
  describe('first tab', function(){
    describe('when not set in HTML', function(){
      it('will display the first tab in tabs array', function(){
        const firstTabName = TestTabsController.tabs[0]

        expect(findTabByName(firstTabName)).to.be.displayed
      })
    })

    describe('when set in HTML', function(){
      before(function(){
        this.sandbox.stub(TestTabsController, 'tabs').value(['business', 'personal'])

        fixture.el.firstChild.dataset.testTabsSelectedTab = 'personal'
        this.controller.connect()
      })

      it('displays tab set in HTML', function(){
        expect(findTabByName('personal')).to.be.displayed
        expect(findTabByName('business')).not.to.be.displayed
      })
    })
  })

  describe('other tabs', function(){
    beforeEach(function(){
      this.sandbox.stub(TestTabsController, 'tabs').value(['business', 'personal', 'other'])
      this.controller.connect()
    });

    it('hides all tabs except the first one', function(){
      expect(findTabByName('personal')).not.to.be.displayed
      expect(findTabByName('other')).not.to.be.displayed
    });
  })
})

describe('show actions', function(){
  beforeEach(function(){
    this.sandbox.stub(TestTabsController, 'tabs').value(['business', 'personal'])
    this.controller.initialize()
    this.controller.connect()

    this.controller.showPersonalTab()
  });

  it('displays corresponding tab\'s content', function(){
    expect(findTabByName('personal')).to.be.displayed
    expect(findTabByName('business')).not.to.be.displayed
  })

  it('calls selected callback', function(){
    const selected = sinon.stub(this.controller, 'selected')

    this.controller.showPersonalTab()
    expect(selected).to.have.been.called
  });
});

// TODO: test getters and selectedTabClass

function findTabByName(name) {
  return fixture.el.firstChild.querySelector(`[data-target$=${name}${TestTabsController.tabSuffix}]`)
}
