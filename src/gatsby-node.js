import createNodeHelpers from 'gatsby-node-helpers'
import { createClient, fetchAll } from './fetch'

const { createNodeFactory } = createNodeHelpers({ typePrefix: `Tumblr` })

const PostNode = createNodeFactory(`Post`)

export const sourceNodes = async (
  { boundActionCreators: { createNode } },
  { blogIdentifier, consumerKey },
) => {
  const client = createClient({ blogIdentifier, consumerKey })

  const posts = await fetchAll(client, `posts`)
  posts.forEach(post => createNode(PostNode(post)))
}
