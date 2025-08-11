<?php

namespace wusong8899\Client1LinksQueue\Controllers;

use wusong8899\Client1LinksQueue\Serializer\LinksQueueSerializer;
use wusong8899\Client1LinksQueue\Model\LinksQueue;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListLinksQueueController extends AbstractListController
{
    public $serializer = LinksQueueSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return LinksQueue::orderBy('sort', 'asc')->get();
    }
}
