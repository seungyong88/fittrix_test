import { FullPost } from "@/types/posts";
import { assetsUrl, client, urlFor } from "./sanity";

export async function getPostsOf(username: string, exercise: string) {
  const exerciseQuery = exercise == 'all' ? '' : `&& exercise == '${exercise}'`;
  return await client
    .fetch(
      `*[_type == "post" && author._ref == '${username}' ${exerciseQuery}]{
      ...,
      author-> {
        username,
        name,
        image
      }
    }`
    )
    .then((posts) => {
      return posts.map((post: FullPost) => {
        return {
          ...post,
          author: {
            ...post.author,
            url: urlFor(post.author.image),
          },
          images: post.images.map((image) => {
            return {
              ...image,
              url: urlFor(image),
            };
          }),
        };
      });
    });
}

export async function createPost(userId: string, text: string, exercise: string, images: Blob[]) {
  const promises = images.map((image) => {
    return fetch(assetsUrl, {
      method: "POST",
      headers: {
        contentType: image.type,
        Authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
      },
      body: image,
    });
  });

  try {
    const response = await Promise.all(promises);
    const result = await Promise.all(response.map((res) => res.json()));

    return client.create(
      {
        _type: "post",
        author: {
          _ref: userId,
          _type: "reference",
        },
        comment: text,
        exercise: exercise,
        images: [
          ...result.map((res) => {
            return {
              _type: "image",
              asset: {
                _ref: res.document._id,
              },
            };
          }),
        ],
      },{
        autoGenerateArrayKeys: true,
      })

  } catch (err) {
    console.log(err);
  }
}
