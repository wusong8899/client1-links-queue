<?php

namespace wusong8899\Client1LinksQueue\Controllers;

use wusong8899\Client1LinksQueue\Serializer\LinksQueueSerializer;
use wusong8899\Client1LinksQueue\Model\LinksQueue;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class LinksQueueAddController extends AbstractCreateController
{
    public $serializer = LinksQueueSerializer::class;
    protected $settings;
    protected $translator;

    public function __construct(Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $requestData = $request->getParsedBody()['data']['attributes'];
        $errorMessage = "";

        if (!isset($requestData)) {
            $errorMessage = 'wusong8899-guaguale.admin.guaguale-add-error';
        } else {
            $linkQueue = new LinksQueue();
            $linkQueue->name = $requestData['name'];
            $linkQueue->links = $requestData['url'];
            $linkQueue->save();

            return $linkQueue;
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
