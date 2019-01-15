import * as exported from "./export";

const plugin: exported.CadesBrowserPluginLoader = new exported.CadesBrowserPluginLoader();

(<any> window).cadesplugin = Object.assign(plugin, (<any> window).cadesplugin, exported); //tslint:disable-line prefer-object-spread
