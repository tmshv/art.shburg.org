import os
import re
from datetime import datetime
from lxml import etree

import lxml.html
from markdown import markdown

import settings
from sync.models import Model


def create_date(date_str, date_formats=None):
    """
    2016
    2016.10
    2016.10.10
    -> datetime

    :param date_formats:
    :param date_str:
    :return:
    """
    if not date_formats:
        date_formats = [
            '%Y',
            '%Y.%m',
            '%Y.%m.%d'
        ]

    for format in date_formats:
        try:
            return datetime.strptime(date_str, format)
        except:
            continue
    return None


# 2016 На крыльях бабочек
# 2016.10 На крыльях бабочек
# 2016.10.10 На крыльях бабочек
folder_name_pattern = re.compile('([\d.]+)(.*)')


async def untouched(items: [Model]) -> [Model]:
    if settings.skip_unchanged:
        return items

    result = []
    for item in items:
        status = await item.is_changed()
        if status:
            result.append(item)
    return result

    # def is_equals(e, n):
    #     return (n is None) or ('hash' not in n) or (e.hash != n['hash'])
    #
    # doc = lambda i: {'id': i.id, 'hash': i.hash}
    #
    # stored_documents = [(i, store.read(doc(i))) for i in documents]
    # filtered_documents = [i[0] for i in stored_documents if is_equals(*i)]

    # return filtered_documents


def create_date_and_title_from_folder_name(folder_name, date_formats=None):
    m = folder_name_pattern.findall(folder_name)
    if not m:
        return None, None

    date_str, title = m[0]
    title = os.path.splitext(title.strip())[0]
    date = create_date(date_str, date_formats)

    if not date:
        return None, title

    return date, title


async def create_post(md, image_path_fn):
    html = lxml.html.fromstring(md)

    for img in html.cssselect('img'):
        src = img.get('src')
        path = await image_path_fn(src)

        if path:
            img.set('src', path)
            img.set('class', settings.album_html_img_class)
            img.set('data-file', src)
    return etree.tounicode(html)


def images_from_html(md):
    if not md:
        return []

    post_html = lxml.html.fromstring(md)

    images = []
    for img in post_html.cssselect('img'):
        src = img.get('src')
        images.append(src)
    return images


def title_from_html(md):
    if not md:
        return None

    doc = lxml.html.fromstring(md)
    ts = doc.cssselect('h1')
    if len(ts):
        return ts[0].text


create_post_from_image_list = lambda images: markdown(
    '\n'.join(map(
        lambda i: '![]({img})'.format(img=i),
        images
    ))
)
