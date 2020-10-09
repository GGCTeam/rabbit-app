import AppMetrica from 'react-native-appmetrica';

import { generateYandexMetrikaApiKey } from '../utils/helpMethods';

class YandexService implements IService {
  init = async () => {
    await this.setupMetrica();
  }

  reportError = async (e: string) => {
    AppMetrica.reportError(e);
  }

  private setupMetrica = async () => {
    try {
      AppMetrica.activate({
        apiKey: generateYandexMetrikaApiKey(),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new YandexService();