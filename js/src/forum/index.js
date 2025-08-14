import app from 'flarum/forum/app';
import LinksQueue from "./model/LinksQueue";
import { DataLoader } from './services/DataLoader';

app.initializers.add('wusong8899-client1-links-queue', () => {
  app.store.models.linksQueueList = LinksQueue;

  // Initialize DataLoader service
  const dataLoader = DataLoader.getInstance();

  // Make DataLoader available globally for other extensions
  if (typeof window !== 'undefined') {
    window.LinksQueueDataLoader = dataLoader;
  }
});