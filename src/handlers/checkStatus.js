export default function checkStatus(username) {
  return fetch(`https://backend-adminpanel.onrender.com/api/users/${username}`)
    .then(res => res.json())
    .then(data => data.user_status)
    .catch(() => {
      return "deleted";
    });
}
