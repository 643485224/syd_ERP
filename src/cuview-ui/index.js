import timeAllFounctioncu from './function/timeAllFounction'
import dealTree from './function/dealTree'
import deepClone from './function/deepClone'
import debounce from "./function/debounce";
import throttle from "./function/throttle";
import test from "./function/test";
import simulationClick from './function/simulationClick'
import menuHandle from './function/menuHandle'
import randomColor from './function/randomColor'
let $cu = {
  timeAllFounctioncu,
  dealTree,
  deepClone,
  debounce,
  throttle,
  test,
  simulationClick,
  menuHandle,
  randomColor
};

import cuFullScreen from './components/cu-fullscreen/cu-fullscreen.vue'
import cuEchartPie from './components/cu-echart/cu-echart-pie.vue'
import cuTable from './components/cu-table/cu-table.vue'
import cuRequisition from './components/cu-requisition/cu-requisition.vue'
import cuAnimation from './components/cu-animation/cu-animation.vue'
import cuDialog from './components/cu-dialog/cu-dialog.vue'
import cuWaveItem from './components/cu-waveItem/cu-waveItem.vue'
import cuHoverItem from './components/cu-hoverItem/cu-hoverItem.vue'
import cuClickBone from './components/cu-clickBone/cu-clickBone.vue'
import cuHoverItemX from './components/cu-hoverItemX/cu-hoverItemX.vue'
import cuCalendar from './components/cu-calendar/cu-calendar.vue'
import cuDraggable from './components/cu-draggable/cu-draggable.vue'
import cuConstruction from './components/cu-construction/cu-construction.vue'
let components = {
  cuFullScreen,
  cuEchartPie,
  cuTable,
  cuRequisition,
  cuAnimation,
  cuDialog,
  cuWaveItem,
  cuHoverItem,
  cuClickBone,
  cuHoverItemX,
  cuCalendar,
  cuDraggable,
  cuConstruction
}



const install = Vue => {

  Object.keys(components).forEach(val => {
    Vue.component(val, components[val]);
  })

  Vue.prototype.$cu = $cu;
  Vue.prototype.$cu.eventBus = new Vue();
}

export default {
  install,
}
