<?php

namespace wusong8899\Client1LinksQueue\Controllers;

use wusong8899\Client1LinksQueue\Serializer\LinksQueueSerializer;
use wusong8899\Client1LinksQueue\Model\LinksQueue;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class LinksQueueSortController extends AbstractListController
{
    public $serializer = LinksQueueSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();
        $linkQueueOrder = Arr::get($request->getParsedBody(), 'linkQueueOrder');

        foreach ($linkQueueOrder as $itemID => $order) {
            LinksQueue::query()->where('id', $itemID)->update(['sort' => $order]);
        }
    }
}
