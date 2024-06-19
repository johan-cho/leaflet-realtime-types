/**
 * @typedef {import('../index')}
 * @typedef {import('leaflet')}
 */

"use strict";

const map = L.map("map").setView([51.505, -0.09], 13);
const realtime = L.realtime("vehicles", {
  cache: true,
});

realtime.on("update", function (event) {
  console.log(event);
});
