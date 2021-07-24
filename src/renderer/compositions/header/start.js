import { Buttons } from './modules/Buttons';
import { Form } from './modules/Form';
import { Page } from './modules/Page';

function loadApplication() {
  Form.init();
  Page.init();
  Buttons.init();
}

loadApplication();
