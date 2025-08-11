import Component from "flarum/Component";
import Button from 'flarum/components/Button';
import LinksQueueAddModal from './LinksQueueAddModal';
import LinksQueueDeleteModal from './LinksQueueDeleteModal';

export default class LinksQueueListItem extends Component {
  view() {
    const {LinksQueueItemData} = this.attrs;
    const linkID = LinksQueueItemData.id();
    const linkName = LinksQueueItemData.name();
    const linkUrl = LinksQueueItemData.links();
    const linkSort = LinksQueueItemData.sort();

    return (
      <div style="border: 1px dotted var(--control-color);padding: 10px;border-radius: 4px;">
        <div>
          <div style="padding-top: 5px;">
            <Button className={'Button Button--primary'} onclick={() => this.editItem(LinksQueueItemData)}>
              {app.translator.trans('wusong8899-links-queue.admin.settings.item-edit')}
            </Button>
            &nbsp;
            <Button style="font-weight:bold;width:66px;" className={'Button Button--danger'} onclick={() => this.deleteItem(LinksQueueItemData)}>
              {app.translator.trans('wusong8899-links-queue.admin.settings.item-delete')}
            </Button>&nbsp;&nbsp;

            <b>{app.translator.trans('wusong8899-links-queue.admin.settings.item-id')}: </b>
            {linkID}&nbsp;|&nbsp;
            <b>{app.translator.trans('wusong8899-links-queue.admin.settings.item-name')}: </b>
            {linkName}&nbsp;|&nbsp;
            <b>{app.translator.trans('wusong8899-links-queue.admin.settings.item-url')}: </b>
            {linkUrl}&nbsp;
          </div>
        </div>
      </div>
    );
  }

  editItem(LinksQueueItemData) {
    app.modal.show(LinksQueueAddModal, {LinksQueueItemData})
  }

  deleteItem(LinksQueueItemData) {
    app.modal.show(LinksQueueDeleteModal, {LinksQueueItemData})
  }
}
