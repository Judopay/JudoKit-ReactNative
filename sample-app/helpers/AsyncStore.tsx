import { createStore } from 'redux'

// eslint-disable-next-line
function emptyHook() {}

export const store = createStore(emptyHook)
export const storageKey = 'storage_key'
