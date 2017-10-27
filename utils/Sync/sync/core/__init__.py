import logging

import settings
from sync import untouched
from sync.data import Provider


def get_id(item):
    try:
        return item.id
    except AttributeError:
        return item['id']


class Sync:
    def __init__(self, provider: Provider, model):
        super().__init__()

        self.validate_urls = True
        self.strict_origin = False
        self.__default_build_args = {
            'sizes': settings.image_sizes,
        }
        self.__delete_query = lambda item: {'_id': item['_id']}

        name = model.__name__
        self.logger = logging.getLogger('%s.%s' % (settings.name, name))

        self.provider = provider
        self.model = model

    async def clean(self):
        pass

    async def update(self, item):
        args = self._get_build_args()

        await item.build(**args)
        await item.upload()
        await item.save()

    def _get_build_args(self):
        return {
            **self.__default_build_args
        }

    def __items_to_delete_query(self, items):
        query = {
            'id': {'$nin': [doc.id for doc in items]},
        }

        if self.strict_origin:
            items_origin = list(set([doc.origin for doc in items]))

            query = {
                **query,
                'origin': {'$in': items_origin},
            }

        return query

    async def run(self):
        """
        # Get scope files
        # Validate these files. Raise an error
        # calc_hashes
        # make diff with previous run
        # compile objects
        # upload

        :return:
        """
        self.logger.info('Checking for update')

        items = await self.model.scan(self.provider)
        self.logger.info('Found {} Item(s)'.format(len(items)))

        if self.validate_urls:
            self.check_urls_uniqueness(items)

        # SKIP UNTOUCHED DOCUMENTS
        changed_items = await untouched(items)
        self.logger.info('Changed {} Items(s)'.format(len(changed_items)))

        # UPDATING
        if settings.update_enabled:
            for item in changed_items:
                await self.update(item)
                self.logger.info('Updated Item {}'.format(item))

        # DELETING
        if settings.delete_enabled:
            obsolete_items = await self.model.find(self.__items_to_delete_query(items))
            obsolete_items = list(obsolete_items)

            for item in obsolete_items:
                self.logger.info('Deleting Item {}'.format(item['id']))
                await self.model.delete(self.__delete_query(item))

        await self.clean()

    def check_urls_uniqueness(self, items):
        urls = [x.url for x in items]
        unique_urls = set(urls)

        if len(urls) != len(unique_urls):
            self.logger.error('URLs is not unique')
            raise Exception('URLs is not unique')

    async def upload(self):
        pass
