import type { RootConfig } from './types';

export const defaultConfig: RootConfig = {
  env: (process.env.NODE_ENV as any) || 'production',
  app: {
    extensionId: 'wusong8899-client1-links-queue',
    translationPrefix: 'wusong8899-links-queue',
  },
  data: {
    apiResources: {
      linksQueueList: 'linksQueueList',
    },
  },
};
