import settings
from sync.data.fs import FSProvider
from sync.data.yandexdisk import YDProvider
from sync.document import sync_documents
from utils.fn import lprint_json


def get_provider(provider_type, root):
    if provider_type == 'fs':
        return FSProvider(root)
    elif provider_type == 'yd':
        return YDProvider(root, settings.yandex_disk_access_token)
    return None


def main(provider, fn, name):
    if provider:
        u, d = fn(provider, update=settings.do_update, delete=settings.do_update)
        print('DELETE %s: %s' % (name.upper(), 'NO' if not settings.do_delete else str(len(d))))
        lprint_json(d)

        print('UPDATE %s: %s' % (name.upper(), 'NO' if not settings.do_update else str(len(u))))
        lprint_json(u)


if __name__ == '__main__':
    client = get_provider(settings.sync_provider_type, settings.dir_documents)

    main(client, sync_documents, 'documents')
