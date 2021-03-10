import * as Components from "./components";

import { createApp } from "vue";
import App from "./App.vue";

const removeKeysFromObject = (object, keys) => {
  return Object.entries(object).reduce((obj, [key, value]) => {
    if (!keys.includes(key) && !keys.includes(value.name)) {
      obj[key] = value;
    }
    return obj;
  }, {});
};

const library = {
  install(Vue, options) {
    let pluginComponents = Components;

    const toRemove = options && options.remove ? options.remove : null;
    if (toRemove && Array.isArray(toRemove)) {
      pluginComponents = removeKeysFromObject(Components, toRemove);
    }

    for (let plugin in pluginComponents) {
      Vue.component(plugin, Components[plugin]);
    }
  },
};

createApp(App).mount("#app");

export default library;

export * from "./components";
