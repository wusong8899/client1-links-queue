<?php

use Flarum\Extend;
use wusong8899\Client1LinksQueue\Controllers\ListLinksQueueController;
use wusong8899\Client1LinksQueue\Controllers\LinksQueueAddController;
use wusong8899\Client1LinksQueue\Controllers\LinksQueueUpdateController;
use wusong8899\Client1LinksQueue\Controllers\LinksQueueDeleteController;
use wusong8899\Client1LinksQueue\Controllers\LinksQueueSortController;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Routes('api'))
        ->get('/linksQueueList', 'linksQueue.get', ListLinksQueueController::class)
        ->patch('/linksQueueList/{id}', 'linksQueueList.update', LinksQueueUpdateController::class)
        ->delete('/linksQueueList/{id}', 'linksQueueList.delete', LinksQueueDeleteController::class)
        ->post('/linksQueueList', 'linksQueue.add', LinksQueueAddController::class)
        ->post('/linksQueueList/order', 'linksQueue.order', LinksQueueSortController::class),
];

return $extend;