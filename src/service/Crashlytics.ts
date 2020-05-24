import crashlytics from '@react-native-firebase/cra';

class Crashlytics {
  constructor() {
    // noinspection JSUnresolvedFunction
    this._crashlytics = crashlytics();
  }

  crash = (): void => this._crashlytics.crash();

  log = (message: string): void => this._crashlytics.log(message);

  recordError = (code: number, message: string): void =>
    this._crashlytics.recordError(code, message);

  setBoolValue = (key: string, value: boolean): void =>
    this._crashlytics.setBoolValue(key, value);
  setFloatValue = (key: string, value: number): void =>
    this._crashlytics.setFloatValue(key, value);
  setIntValue = (key: string, value: number): void =>
    this._crashlytics.setIntValue(key, value);
  setStringValue = (key: string, value: string): void =>
    this._crashlytics.setStringValue(key, value);

  setUserIdentifier = (userId: string): void =>
    this._crashlytics.setUserIdentifier(userId);

  enableCrashlyticsCollection = (): void =>
    this._crashlytics.enableCrashlyticsCollection();
}

export default new Crashlytics();
