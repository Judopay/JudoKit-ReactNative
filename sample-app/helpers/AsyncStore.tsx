import { createStore } from 'redux'

function emptyHook() {}

export const store = createStore(emptyHook)
export const storageKey = 'storage_key'
