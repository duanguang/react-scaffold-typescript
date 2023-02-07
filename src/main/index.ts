import 'core-js/stable';
import 'regenerator-runtime/runtime';
import create from '@legions/core';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { globalStateStore } from '@/common/stores/global.store';
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
  const store = globalStateStore()
  if (store) {
  }
  const app = create({ enableDevTools: false,router: true,history: props.history || createBrowserHistory() });
  render(app);
}
export async function unmount() { ReactDOM.unmountComponentAtNode(document.getElementById(appId)) }
// @ts-ignore
if (module.hot && process.env.environment === 'dev') {
  // @ts-ignore
  module.hot.accept();
}

