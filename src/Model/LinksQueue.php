<?php

namespace wusong8899\Client1LinksQueue\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;

class LinksQueue extends AbstractModel
{
    use ScopeVisibilityTrait;
    protected $table = 'wusong8899_links_queue';
}
