const returnOffset = require('./return-offset')
const returningTopics = require('./returning-topics')

module.exports = (root, { db }, context) => {
  const LIMIT = 10
  const { page } = root
  const offset = returnOffset(page, LIMIT)

  return db('cards')
    .select('uid_topic')
    .leftJoin('topics', 'topics.uid', 'cards.uid_topic')
    .where('topics.is_private', false)
    .groupBy('uid_topic')
    .orderByRaw(`count('uid_topic') desc`)
    .offset(offset)
    .limit(LIMIT)
    .then(returningTopics(db))
}
