import re

from unidecode import unidecode

from utils.fn import iterate_over_fns

remove_pattr = re.compile('[«»<>,!&"\']')
reduce_dash_pattr = re.compile('[-]+')


def translit(text):
    """
    RUSSIAN TEXT => ENGLISH TEXT
    """
    return unidecode(text)


def interpolate(text, storage, key_fn=None):
    if not key_fn:
        key_fn = lambda i: i

    key = key_fn(text)
    return storage[key] if key in storage else text


def interpolate_swift(i):
    return re.search("([\d\w-]+)", i).group(1)


def remove_punctuation(i):
    return remove_pattr.sub('', i)


def reduce_dashes(i):
    return reduce_dash_pattr.sub('-', i)


def space_to_dash(i):
    return i.replace(' ', '-')


def short_dash(i):
    """
    minus -> dash
    tire -> dash
    :param i:
    :return:
    """
    return i.replace('–', '-').replace('—', '-')


def dot_to_dash(i):
    return i.replace('.', '-')


def remove_underscores(i):
    return i.replace('_', '')


def text_lower(i):
    return i.lower()


url_encode_file = iterate_over_fns([
    translit,
    space_to_dash,
    short_dash,
    remove_underscores,
    remove_punctuation,
    reduce_dashes,
    text_lower
])

url_encode_text = iterate_over_fns([
    translit,
    space_to_dash,
    dot_to_dash,
    short_dash,
    remove_underscores,
    remove_punctuation,
    reduce_dashes,
    text_lower
])
