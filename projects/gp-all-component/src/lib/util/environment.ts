export interface IEnvironment {
  production: boolean;
  appName: string;
  appTitle: string;
  baseUrl: string;
  loginUrl: string;
  menuUrl?: string;
  version?: string;
}

export const environmentBase: IEnvironment = {
  production: false,
  appName: '',
  appTitle: '',
  baseUrl: '',
  loginUrl: '',
  menuUrl: '',
  version: '',
};
