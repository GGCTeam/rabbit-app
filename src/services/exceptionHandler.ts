import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

import yandex from './yandex';

class ExceptionHandlerService {
  init = async () => {
    await this.setupExceptionHandlers();
  }

  private setupExceptionHandlers = async () => {
    setJSExceptionHandler(this.JSExceptionHandler);
    setNativeExceptionHandler(this.NativeExceptionHandler, false);
  }

  private JSExceptionHandler = async (e: Error, isFatal: boolean) => {
    yandex.reportError(`${e.name} -- ${e.message}`)
  }

  private NativeExceptionHandler = async (exceptionMsg: string) => {
    yandex.reportError(exceptionMsg)
  }
}

export default new ExceptionHandlerService();