import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage = localStorage;

  constructor() { }

  setItem(key: string, value: string) {
    this._storage.setItem(key, value);
  }

  getItem(key: string): string {
    return this._storage.getItem(key);
  }

  removeItem(key) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }
}
