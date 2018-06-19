import Layer from './components/layer/layer.js';

function App(){
  const el = document.getElementById('app');
  const tpl = new Layer();
  el.innerHTML = tpl.tpl;
}
new App();
