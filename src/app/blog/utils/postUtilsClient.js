export const getAllTags = (postData) => {
  const tags = [];
  postData.forEach((collection) => {
    collection.posts.forEach((post) => {
      post.metadata.tags.forEach((tag) => {
        if (!tags.includes(tag)) tags.push(tag);
      });
    });
  });

  return tags;
};

export const getPostsByTag = (postData, tag) => {
  const posts = [];
  postData.forEach((collection) => {
    collection.posts.forEach((post) => {
      if (post.metadata.tags.includes(tag)) posts.push(post);
    });
  });

  return posts;
}