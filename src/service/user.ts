import { client } from "./sanity";

export async function addUser(user: any) {
  return client.createIfNotExists({
    _id: user.username,
    _type: "user",
    userType: "",
    id: user.username, // interface authorize
    username: user.username,
    password: user.password,
  });
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