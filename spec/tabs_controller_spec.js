import TestTabsController from "../src/tabs_controller"
import { Application } from "stimulus"
import { registerApplication, findTabByName } from "./helpers"
import chai, { expect } from "chai"
import chaiDom from "chai-dom"
import sinonChai from "sinon-chai"

chai.use(chaiDom)
chai.use(sinonChai)

function setController() {
  const stimulusApp = Application.start()
  stimulusApp.register("test-tabs", TestTabsController)
  const _controller = stimulusApp.controllers[0]
  return function() {
    return stimulusApp
  }
}

window.stimulusApp = setController()()

before(function() {
  fixture.load("index.html")

  this.sandbox = sinon.createSandbox()
})

afterEach(function() {
  fixture.el.firstChild.removeAttribute("data-test-tabs-selected-tab")
  fixture.el.firstChild.removeAttribute("data-test-tabs-previous-selected-tab")
  this.sandbox.restore()
})

describe("initial state", function() {
  describe("first tab", function() {
    context("when not set in HTML", function() {
      it("will display the first tab in tabs array", function() {
        const firstTabName = "buissnes"
        expect(findTabByName(firstTabName)).to.be.displayed
      })
    })

    context("when set in HTML", function() {
      before(function() {
        this.sandbox
          .stub(TestTabsController, "tabs")
          .value(["business", "personal"])

        fixture.el.firstChild.dataset.testTabsSelectedTab = "personal"

        stimulusApp.controllers[0].connect()
      })

      it("displays tab set in HTML", function() {
        expect(findTabByName("personal")).to.be.displayed
        expect(findTabByName("business")).not.to.be.displayed
      })
    })
  })

  describe("other tabs", function() {
    beforeEach(function() {
      this.sandbox
        .stub(TestTabsController, "tabs")
        .value(["business", "personal", "other"])
      stimulusApp.controllers[0].connect()
    })

    it("hides all tabs except the first one", function() {
      expect(findTabByName("personal")).not.to.be.displayed
      expect(findTabByName("other")).not.to.be.displayed
    })
  })
})

describe("show actions", function() {
  beforeEach(function() {
    this.sandbox
      .stub(TestTabsController, "tabs")
      .value(["business", "personal"])
    stimulusApp.controllers[0].initialize()
    stimulusApp.controllers[0].connect()

    stimulusApp.controllers[0].showPersonal()
  })

  it("displays corresponding tab's content", function() {
    expect(findTabByName("personal")).to.be.displayed
    expect(findTabByName("business")).not.to.be.displayed
  })

  it("calls selected callback", function() {
    const selected = sinon.stub(stimulusApp.controllers[0], "selected")

    stimulusApp.controllers[0].showPersonal()
    stimulusApp.controllers[0].showBusiness()
    expect(selected).to.have.been.called
  })
})
