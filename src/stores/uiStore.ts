import { observable, action, makeObservable } from 'mobx';

class UIStore {
  constructor() { makeObservable(this) }

  @observable componentId: string = ''; // current component id

  @action setComponentId = (value: string) => this.componentId = value;
}

export default new UIStore();