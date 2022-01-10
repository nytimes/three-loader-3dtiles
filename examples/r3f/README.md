# three-loader-3dtiles & react-three-fiber

This example demonstrates interoperability between the 3D Tiles loader and [react-three-fiber](https://github.com/pmndrs/react-three-fiber). The tileset is wrapped around the `useLoader` interface. The `<ErrorBoundary>` and `<Suspense>` tags are used to provide feedback on the loading state of the tileset. The `<group dispose>` attribute is used to automatically dispose of the tileset when the component is dropped.

## Running
```
npm install
npm run dev
```
