import { createStore } from 'redux'

function emptyHook() { }

export let store = createStore(emptyHook)
export const storageKey = "storage_key"