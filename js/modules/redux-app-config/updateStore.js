export default function({ persistor, store, actions }) {
  const state = store.getState();
  // Modification of redux store may lead to fatal errors after an update.
  // Purge the store when necessary.
}
