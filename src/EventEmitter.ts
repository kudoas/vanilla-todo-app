// observer pattern
// ディスパッチ側：emitメソッドは、指定されたイベント名に登録済みの全てのコールバック関数を呼び出す
// リッスン側：addEventListenerメソッドは、指定したイベント名に任意のコールバック関数を登録できる

import { isJSDocCallbackTag } from "typescript";

export class EventEmitter {
  private _listeners: Map<string, Set<any>>;

  constructor() {
    this._listeners = new Map();
  }

  /**
   * 指定したイベントが実行された時に呼びだされるリスナー関数と登録する
   */
  addEventListener(type: string, listener: Function) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listener);
  }

  /**
   * 指定したイベントをディスパッチする
   */
  emit(type: string) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((listener) => {
      listener.call(this);
    });
  }

  /**
   * 指定したイベントのイベントリスナーを解除する
   */
  removeEventListener(type: string, listener: Function) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((ownListener) => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
