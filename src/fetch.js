import url from 'url'
import querystring from 'querystring'
import fetch from 'node-fetch'

const URL_BASE = `https://api.tumblr.com/v2/blog/`

export const createClient = ({ blogIdentifier, consumerKey }) => async (
  endpoint,
  query = {},
) => {
  const resolvedURL = url.resolve(URL_BASE, endpoint)
  const stringifiedQuery = querystring.stringify({
    api_key: consumerKey,
    ...query,
  })

  const response = await fetch(resolvedURL + '?' + stringifiedQuery)
  const json = await response.json()

  return json
}

const pagedGet = async (
  client,
  endpoint,
  query = {},
  offset = 0,
  limit = 20,
  aggregatedResponse = null,
) => {
  const response = await client(endpoint, {
    ...query,
    offset,
    limit,
  })

  aggregatedResponse = aggregatedResponse
    ? aggregatedResponse.concat(response.posts)
    : response.posts

  if (offset + limit < response.blog.total_posts)
    return pagedGet(
      client,
      endpoint,
      query,
      offset + limit,
      limit,
      aggregatedResponse,
    )

  return aggregatedResponse
}

export const fetchAll = async (client, endpoint) => {
  console.time(`Fetch Tumblr ${endpoint} data`)
  console.log(`Starting to fetch ${endpoint} data from Tumblr`)

  const data = await pagedGet(client, endpoint)

  console.timeEnd(`Fetch Tumblr ${endpoint} data`)

  return data
}
