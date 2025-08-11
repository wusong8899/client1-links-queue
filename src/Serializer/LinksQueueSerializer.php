<?php

namespace wusong8899\Client1LinksQueue\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class LinksQueueSerializer extends AbstractSerializer
{
    protected $type = 'linksQueueList';

    protected function getDefaultAttributes($data)
    {
        $attributes = [
            'id' => $data->id,
            'name' => $data->name,
            'links' => $data->links,
            'sort' => $data->sort,
        ];

        return $attributes;
    }
}
