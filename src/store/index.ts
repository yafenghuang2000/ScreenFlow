import { legacy_createStore, applyMiddleware } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { thunk } from 'redux-thunk';
import { rootReducer, whitelist } from '@/reducer';

// 创建存储引擎
const createNoopStorage = () => {
  return {
    getItem(): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any): Promise<any> {
      return Promise.resolve(value);
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

/**
 * 根据当前环境选择使用 sessionStorage 还是无操作存储。
 * 如果在浏览器环境中，则使用 sessionStorage；否则使用无操作存储。
 */
const webStorage =
  typeof window !== 'undefined' ? createWebStorage('session') : createNoopStorage();

/**
 * 创建一个自定义转换器，用于序列化和反序列化状态。
 * 这里简单地返回输入的状态，可以根据需要进行更复杂的转换。
 */
const transform = createTransform(
  (inboundState) => inboundState, // 序列化
  (outboundState) => outboundState, // 反序列化
);

// 配置持久化
const persistConfig = {
  key: 'asp-admin-xms',
  storage: webStorage,
  transforms: [transform],
  whitelist: [...whitelist],
};

const persistedReducer = persistReducer(persistConfig as any, rootReducer);

// 创建 store，应用中间件
const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// 创建持久化存储
const persist = persistStore(store);

export { store, persist };
