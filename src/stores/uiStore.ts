import { observable, action, makeObservable } from 'mobx';
import { persist } from 'mobx-persist';

import { generateTheme } from '../utils/useStyles';

class UIStore implements IStore {
  STORAGE_ID = 'UIStore';
  constructor() { makeObservable(this) }

  @observable theme = generateTheme(); // current theme, set in services.darkmode
  @observable componentId: string = ''; // current component id

  @action setComponentId = (value: string) => this.componentId = value;

  @action toggleThemeTo = (theme: ThemeType) => {
    this.theme = theme;
  }
}

export default new UIStore();