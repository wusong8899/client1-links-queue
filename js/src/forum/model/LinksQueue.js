import Model from "flarum/Model";

export default class LinksQueue extends Model {}
Object.assign(LinksQueue.prototype, {
  id: Model.attribute("id"),
  name: Model.attribute("name"),
  links: Model.attribute("links"),
  sort: Model.attribute("sort"),
});
