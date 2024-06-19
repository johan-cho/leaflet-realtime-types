# typings for [leaflet-realtime](https://github.com/perliedman/leaflet-realtime)

simple typescript definitions for leaflet-realtime

## installation

```sh
npm install --save-dev leaflet-realtime-types
```

## usage

you could add these lines to the top of your js file.

```js
/**
 * @typedef {import('leaflet-realtime-types')}
 * @typedef {import('leaflet')}
 */
```

## content

```typescript
import * as L from "leaflet";

declare namespace leaflet {}

declare module "leaflet" {
  export class Realtime extends GeoJSON {
    constructor(source: RealtimeSource, options?: RealtimeOptions);
    /**
     * starts automatic updates
     */
    start(): this;
    /**
     * stops automatic updates
     */
    stop(): this;
    /**
     *  tells if automatic updates are running
     */
    isRunning(): boolean;
    /**
     * Updates the layer's data. If `featureData` is provided, it is used to add or update data in the layer, otherwise the layer's source is queried for new data asynchronously
     */
    update(featureData?: GeoJSON.FeatureCollection | GeoJSON.Feature[]): this;
    /**
     * Removes the provided feature or features from the layer
     */
    remove(featureData: GeoJSON.FeatureCollection | GeoJSON.Feature): this;
    /**
     * Retrieves the layer used for a certain feature
     */
    getLayer(featureId: number): Layer | undefined;

    /**
     * Retrieves the feature data for the given `featureId`
     */
    getFeature(featureId: number): GeoJSON | undefined;
  }

  /**
   * creates a new realtime layer
   */
  export function realtime(
    source: RealtimeSource,
    options?: RealtimeOptions
  ): Realtime;

  /**
   * add additional events
   */
  interface Evented {
    on(type: "update", fn: RealtimeUpdateEventHandler, context?: any): this;
    off(type: "update", fn?: RealtimeUpdateEventHandler, context?: any): this;
    once(type: "update", fn: RealtimeUpdateEventHandler, context?: any): this;
    addEventListener(
      type: "update",
      fn: RealtimeUpdateEventHandler,
      context?: any
    ): this;
    removeEventListener(
      type: "update",
      fn?: RealtimeUpdateEventHandler,
      context?: any
    ): this;
    addOneTimeEventListener(
      type: "update",
      fn: RealtimeUpdateEventHandler,
      context?: any
    ): this;
  }
  /**
   * leaflet search options
   */
  interface RealtimeOptions extends GeoJSONOptions {
    /**
     * Should automatic updates be enabled when layer is added on the map and stopped when layer is removed from the map
     * @default true
     */
    start?: boolean;
    /**
     * Automatic update interval, in milliseconds
     * @default 60000
     */
    interval?: number;
    /**
     * Function used to get an identifier uniquely identify a feature over time
     * @default (featureData) => featureData.properties.id
     */
    getFeatureId(featureData: GeoJSON.Feature): any;

    /**
     * Used to update an existing feature's layer; by default, points (markers) are updated, other layers are discarded and replaced with a new, updated layer. Allows to create more complex transitions, for example, when a feature is updated
     * @default (featureData, oldLayer) => newLayer
     */
    updateFeature(featureData: GeoJSON.Feature, oldLayer: Layer): Layer;

    /**
     * Specifies the layer instance to display the results in
     * @default L.geoJson()
     */
    container?: LayerGroup;
    /**
     * Should missing features between updates been automatically removed from the layer
     * @default false
     */
    removeMissing?: boolean;

    /**
     * cache AJAX requests
     * @default false
     */
    cache?: boolean;

    /**
     * @default false
     */
    onlyRunWhenAdded?: boolean;

    /**
     * @default true
     */
    logErrors?: boolean;
  }

  interface RealtimeUpdateEvent extends LeafletEvent {
    features: RealtimeFeatureHash;
    enter: RealtimeFeatureHash;
    update: RealtimeFeatureHash;
    exit: RealtimeFeatureHash;
  }
  interface RealtimeFeatureHash {
    [key: string]: GeoJSON.Feature;
  }

  type RealtimeUpdateEventHandler = (event: RealtimeUpdateEvent) => void;

  type RealtimeSource =
    | string
    | (RequestInit & { url: string })
    | ((
        success: (
          features: GeoJSON.FeatureCollection | GeoJSON.Feature
        ) => void,
        error: (error: Object, message: string) => void
      ) => void);
}
```
