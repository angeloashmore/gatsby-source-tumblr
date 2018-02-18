# gatsby-source-tumblr

Source plugin for pulling posts into Gatsby from Tumblr blogs.

## Install

`npm install --save gatsby-source-tumblr`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-tumblr`,
    options: {
      blogIdentifier: `your_blog_identifier`,
      consumerKey: `your_consumer_key`,
    },
  },
]
```

## How to query

You can query Post nodes created from Tumblr like the following:

```graphql
{
  allTumblrPost {
    edges {
      node {
        id
        type
        date
        notes {
          type
          blog_name
        }
      }
    }
  }
}
```
