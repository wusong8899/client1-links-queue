import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import LinksQueue from "./model/LinksQueue";

app.initializers.add('wusong8899-client1-links-queue', () => {
  app.store.models.linksQueueList = LinksQueue;
});