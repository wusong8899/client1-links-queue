export type Environment = 'development' | 'staging' | 'production' | 'test';

export interface AppConfig {
  extensionId: string;
  translationPrefix: string;
}

export interface DataConfig {
  apiResources: {
    linksQueueList: string;
  };
}

export interface RootConfig {
  env: Environment;
  app: AppConfig;
  data: DataConfig;
}
