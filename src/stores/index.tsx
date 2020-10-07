import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';

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

// list of hydrate functions from stores needed to be performed before app start
const hydrate = create({
    storage: AsyncStorage,
    debounce: 500,
});
export const hydrateStores = async () => {
    await hydrate(stores.subreddits.STORAGE_ID, stores.subreddits);
};
