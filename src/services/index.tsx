import React from 'react';

import NavigationService from './navigation';
import ApiService from './api';

export const services = {
  navigation: NavigationService,
  api: ApiService,
};

const servicesContext = React.createContext(services);

export const withServicesProvider = (C: React.FC) => (props: any) => {
  return (
    <servicesContext.Provider value={services}>
      <C {...props} />
    </servicesContext.Provider>
  );
};

export const useServices = () => React.useContext(servicesContext);

export const initServices = async () => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = services[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};