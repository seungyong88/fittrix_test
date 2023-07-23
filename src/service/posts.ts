import { FullPost } from "@/types/posts";
import { assetsUrl, client, urlFor } from "./sanity";

export async function getPostsOf(username: string, exercise: string) {
  const exerciseQuery = exercise == 'all' ? '' : `&& exercise == '${exercise}'`;
  return await client
    .fetch(
      `*[_type == "post" ${exerciseQuery}] | order(_updatedAt desc){
      ...,
      "commentsCount": count(comments),
      "comments": comments[]{
        ...,
        "author": author-> {
          username,
          image
        }
      },
      author-> {
        username,
        name,
        image
      }
    }`
    )
    .then((posts) => {
      return posts.map((post: FullPost) => {
        console.log("asdasdasd", post);
        return {
          ...post,
          author: {
            ...post.author,
            url: urlFor(post.author.image),
          },
          comments: post.comments?.map((comment) => {
            return {
              ...comment,
              url : urlFor(comment.author.image)
            }
          }),
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


export async function addComment(postId: string, userId: string, comment: string) {
  return client
  .patch(postId)
  .setIfMissing({ comments: [] })
  .append('comments', [
    {
      comment: comment,
      author: { _ref: userId, _type: 'reference'}
    }
  ])
  .commit({ autoGenerateArrayKeys : true })
  
}