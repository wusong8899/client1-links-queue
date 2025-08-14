import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';

export default class LinksQueueAddModal extends Modal {
  static isDismissible = false;

  oninit(vnode) {
    super.oninit(vnode);
    this.LinksQueueItemData = this.attrs.LinksQueueItemData;
    this.settingType = "add";

    if(this.LinksQueueItemData){
      this.settingType = "edit";
      this.itemName = Stream(this.LinksQueueItemData.name());
      this.itemUrl = Stream(this.LinksQueueItemData.links());
    }else{
      this.itemName = Stream("");
      this.itemUrl = Stream("");
    }
  }

  className() {
    return 'Modal--Medium';
  }

  title() {
    return this.settingType==="add"?app.translator.trans('wusong8899-links-queue.admin.settings.item-add'):app.translator.trans('wusong8899-links-queue.admin.settings.item-edit');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
            <div>
              <div class="GuaGuaLeSettingsLabel">{app.translator.trans('wusong8899-links-queue.admin.settings.item-name')}</div>
              <input maxlength="255" required className="FormControl" bidi={this.itemName} />
              <div class="GuaGuaLeSettingsLabel">{app.translator.trans('wusong8899-links-queue.admin.settings.item-url')}</div>
              <input maxlength="500" required className="FormControl" bidi={this.itemUrl} />
            </div>
          </div>

          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              this.settingType==="add"?app.translator.trans('wusong8899-links-queue.admin.data-add'):app.translator.trans('wusong8899-links-queue.admin.data-save')
            )}&nbsp;
            {Button.component(
              {
                className: 'Button guagualeButton--gray',
                loading: this.loading,
                onclick: () => {
                  this.hide();
                }
              },
              app.translator.trans('wusong8899-links-queue.admin.cancel')
            )}
          </div>

        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    if(this.settingType==="edit"){
      this.LinksQueueItemData.save({
          name:this.itemName(),
          url:this.itemUrl(),
      })
      .then(
        () => this.hide(),
        (response) => {
          this.loading = false;
          this.handleErrors(response);
        }
      );
    }else{
      app.store
        .createRecord("linksQueueList")
        .save({
          name:this.itemName(),
          url:this.itemUrl(),
        })
        .then(
          () => {
            location.reload();
          }
        )
        .catch(() => {
          this.loading = false;
          this.handleErrors();
        });
    }
  }
}
