import create from '@legions/core';
import App from './containers/App';
import { fetch } from '@legions/core/fetch';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
if (!window.fetch) {
  window.fetch = fetch
}
const appId = '#app';
if (!window.__POWERED_BY_QIANKUN__) {
  const app = create({ enableDevTools: false, router: true, history: createBrowserHistory() });
  render(app)
}
function render(app) {
  app.start(App, appId);
}



/** 沙箱启动和卸载app */
export async function bootstrap() {
}
export async function mount(props) {
  const app = create({ enableDevTools: false,router: true,history: props.history || createBrowserHistory() });
  render(app);
}
export async function unmount() { ReactDOM.unmountComponentAtNode(document.getElementById(appId)) }
// @ts-ignore
if (module.hot && process.env.environment === 'dev') {
  // @ts-ignore
  module.hot.accept();
}
