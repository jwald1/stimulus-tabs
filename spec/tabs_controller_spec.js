import { TestTabsController } from './test_tabs_controller'
import { registerApplication, findTabByName } from './helpers'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'
import sinonChai from 'sinon-chai'

chai.use(chaiDom)
chai.use(sinonChai)

before(function() {
  registerApplication.call(this, 'test-tabs', TestTabsController)
  this.sandbox = sinon.createSandbox()
})

afterEach(function() {
  fixture.el.firstChild.removeAttribute('data-test-tabs-selected-tab')
  fixture.el.firstChild.removeAttribute('data-test-tabs-previous-selected-tab')
  this.sandbox.restore()
})

describe('initial state', function(){
  describe('first tab', function(){
    context('when not set in HTML', function(){
      it('will display the first tab in tabs array', function(){
        const firstTabName = TestTabsController.tabs[0]

        expect(findTabByName(firstTabName)).to.be.displayed
      })
    })

    context('when set in HTML', function(){
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

    this.controller.showPersonal()
  });

  it('displays corresponding tab\'s content', function(){
    expect(findTabByName('personal')).to.be.displayed
    expect(findTabByName('business')).not.to.be.displayed
  })

  it('calls selected callback', function(){
    const selected = sinon.stub(this.controller, 'selected')

    this.controller.showPersonal()
    this.controller.showBusiness()
    expect(selected).to.have.been.called
  });
})
