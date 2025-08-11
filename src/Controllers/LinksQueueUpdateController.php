<?php

namespace wusong8899\Client1LinksQueue\Controllers;

use wusong8899\Client1LinksQueue\Serializer\LinksQueueSerializer;
use wusong8899\Client1LinksQueue\Model\LinksQueue;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class LinksQueueUpdateController extends AbstractCreateController
{
    public $serializer = LinksQueueSerializer::class;
    protected $translator;

    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();
        $linkQueueID = Arr::get($request->getQueryParams(), 'id');

        if (!isset($linkQueueID)) {
            $errorMessage = 'wusong8899-links-queue.admin.save-error';
        } else {
            $linkQueueSaveData = Arr::get($request->getParsedBody(), 'data', null);
            $errorMessage = "";
            $linkQueueData = LinksQueue::find($linkQueueID);

            if (!isset($linkQueueData)) {
                $errorMessage = 'wusong8899-links-queue.admin.save-error';
            } else {
                if (Arr::has($linkQueueSaveData, "attributes.name")) {
                    $linkQueueData->name = Arr::get($linkQueueSaveData, "attributes.name", null);
                }
                if (Arr::has($linkQueueSaveData, "attributes.links")) {
                    $linkQueueData->links = Arr::get($linkQueueSaveData, "attributes.links", null);
                }

                $linkQueueData->save();

                return $linkQueueData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
