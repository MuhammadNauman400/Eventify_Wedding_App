import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AuthState } from './auth'
import authReducer from './auth'
import toastReducer from './toast'
import { ToasterState } from './toast'

const persistConfig = {
  key: 'root',
  storage
}

export interface RootState {
  auth: AuthState
  toast: ToasterState
}

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
