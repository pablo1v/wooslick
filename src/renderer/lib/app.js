const { Buttons } = require('./modules/Buttons');
const { Form } = require('./modules/Form');
const { Page } = require('./modules/Page');

function loadApplication() {
  Form.init();
  Page.init();
  Buttons.init();
}

module.exports = {
  loadApplication,
};
