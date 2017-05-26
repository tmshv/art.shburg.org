async function find(collection, query, {sort, skip, limit}) {
	const cursor = collection.find(query)

	if (sort) cursor.sort(sort)
	if (skip) cursor.skip(skip)
	if (limit) cursor.limit(limit)

	return cursor.toArray()
}

async function findOne(collection, query) {
	return collection.findOne(query)
}

exports.find = find
exports.findOne = findOne