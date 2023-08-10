export default function checkStatus(username) {
  return fetch(`http://localhost:5000/api/users/${username}`)
    .then(res => res.json())
    .then(data => data.user_status)
    .catch(() => {
      return "deleted";
    });
}
