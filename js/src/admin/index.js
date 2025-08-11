import {extend, override} from 'flarum/extend';
import SettingsPage from './components/SettingsPage';
import LinksQueue from "../forum/model/LinksQueue";

app.initializers.add('wusong8899-client1-links-queue', () => {
  app.store.models.linksQueueList = LinksQueue;
  app.extensionData.for('wusong8899-client1-links-queue').registerPage(SettingsPage);
});
