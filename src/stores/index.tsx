import React from 'react';

import UIStore from './uiStore';
import SubredditsStore from './subredditsStore';

export const stores = {
  ui: UIStore,
  subreddits: SubredditsStore,
};

const storeContext = React.createContext(stores);

export const withStoresProvider = (C: React.FC) => (props: any) => {
  return (
    <storeContext.Provider value={stores}>
      <C {...props} />
    </storeContext.Provider>
  );
};

export const useStores = () => React.useContext(storeContext);

export const hydrateStores = async () => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = stores[key];

      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};
