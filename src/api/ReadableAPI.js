const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())

export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => {
            return res.json().then(posts => {
                return posts.reduce((map, key) => {
                    map[key.id] = key
                    return map
                }, {});
            });
        })

export const getInitialData = () => {
    return Promise.all([
        getCategories(),
        getPosts(),
    ]).then( ([categories, posts]) => ({
        categories : categories.categories.reduce((map, obj) => {
            map[obj.name] = obj;
            return map;
        }, {}),
        posts: posts.reduce((map, key) => {
            map[key.id] = key
            return map
        }, {})
    }) )
}

export const votePost = (postId, option) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option
        })
    })
      .then(res => res.json())

export const removePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
        ...headers
        }
    })
    .then(res => res.json())

export const savePost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())

export const editPost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())