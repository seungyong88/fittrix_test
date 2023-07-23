import { FullPost } from "@/types/posts";
import { assetsUrl, client, urlFor } from "./sanity";

export async function getPostsOf(username: string) {
  return await client.fetch(
    `*[_type == "post" && author._ref == '${username}']{
      ...,
      author-> {
        username,
        name,
        image
      }
    }`
  ).then((posts) => {
    return posts.map((post: FullPost) => {
      return {
        ...post,
        author: { 
          ...post.author,
          url: urlFor(post.author.image)
        },
        images: post.images.map((image) => {
          return {
            ...image,
            url: urlFor(image)
          }
        })
      }
    })
  });
}


export async function createPost(userId: string, text: string, images: Blob[]) {
  return fetch(assetsUrl, {
    method: "POST",
    headers: {
      contentType: images[0].type,
      Authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: images[0],
  }).then((res) => res.json())
  .then((res) => {
    console.log('checked', res);

    client.create({
      _type: "post",
      author: {
        _ref: userId,
        _type: "reference"
      },
      comment: text,
      images: [
        {
          _type: "image",
          asset: {
            _ref: res.document._id,
          }
        }
      ]
    }, {
      autoGenerateArrayKeys: true,
    }).then((res) => {
      console.log(res);
      return res;
    }).catch((err) => {
      console.log(err);
      return err;
    })
  }).catch((err) => {
    console.log(err);
    return err;
  });
}