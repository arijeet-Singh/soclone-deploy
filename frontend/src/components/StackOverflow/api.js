const FIREBASE_DOMAIN =
  "https://stackoverflowclone-7c3d3-default-rtdb.firebaseio.com";

export async function getAllUsers() {
  const response = await fetch(`${FIREBASE_DOMAIN}/users.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  const transformedUsers = [];

  for (const key in data) {
    const userObj = {
      id: key,
      ...data[key],
    };
    transformedUsers.push(userObj);
  }
  return transformedUsers;
}
