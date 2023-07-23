import { client, urlFor } from "./sanity";

type User = {
  username: string;
  password: string;
}

export async function addUser(user: User) {
  return client.createIfNotExists({
    _id: user.username,
    _type: "user",
    userType: "",
    id: user.username, // interface authorize
    username: user.username,
    password: user.password,
  }).then((user: any) => {

    if(user.image) {
      return {
        ...user,
        url: urlFor(user.image)
      };
    }

    return user;
  })
}

export async function setRole(user: any, role: any) {
  const res = await client.fetch(`*[username == $username]`, { username: user.username });
  if(res.length === 0) {
    return { error: "user not found" }
  }
  const id = res[0]._id;
  const res2 = await client.patch(id).set({ userType: role }).commit();
  return res2;
}

export async function getUserByUsername(username: string) {
  return await client.fetch(`*[_type =="user" && username=='${username}']`, { username: username })
  .then((user) => {
    return {
      ...user,
      url: urlFor(user.image)
    };
  })
}
