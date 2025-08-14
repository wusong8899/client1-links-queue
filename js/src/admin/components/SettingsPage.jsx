import ExtensionPage from 'flarum/components/ExtensionPage';
import Button from 'flarum/components/Button';
import LinksQueueAddModal from './LinksQueueAddModal.jsx';
import LinksQueueListItem from './LinksQueueListItem.jsx';

import Sortable from 'sortablejs';

export default class SettingsPage extends ExtensionPage {
  oninit(attrs) {
    super.oninit(attrs);
    this.loading = false;
    this.linksQueueList = [];
    this.loadResults();
  }

  initSort(){
    let el = document.getElementById('linksQueueSortableItems');
    Sortable.create(el,{
          animation: 150,
          swapThreshold: 0.65,
          onEnd: (e) => this.updateSort(e),
        });
  }

  content() {
    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">

          <div style={{paddingBottom: '10px'}}>
            <Button className={'Button'} onclick={() => app.modal.show(LinksQueueAddModal)}>
              {app.translator.trans('wusong8899-links-queue.admin.link-add')}
            </Button>
          </div>

          <ul id="linksQueueSortableItems" style={{padding: '0px', listStyleType: 'none'}} oncreate={this.initSort.bind(this)}>
            {this.linksQueueList.map((LinksQueueItemData) => {
              return (
                <li itemID={LinksQueueItemData.id()} style={{marginTop: '5px', background: 'var(--body-bg)'}}>
                  {LinksQueueListItem.component({ LinksQueueItemData })}
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    );
  }

  updateSort(e){
    const newIndex = e.newIndex;
    const oldIndex = e.oldIndex;

    if(newIndex!==oldIndex){
      const children = e.from.children;
      const linkQueueOrder = {};

      for(let i=0;i<children.length;i++){
        const child = children[i];
        const itemID = $(child).attr("itemID");

        linkQueueOrder[itemID] = i;
      }

      app.request({
        url: `${app.forum.attribute('apiUrl')}/linksQueueList/order`,
        method: 'POST',
        body: { linkQueueOrder },
      });
    }
  }

  parseResults(results) {
    [].push.apply(this.linksQueueList, results);
    m.redraw();
    return results;
  }

  loadResults() {
    return app.store
      .find("linksQueueList")
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }
}
