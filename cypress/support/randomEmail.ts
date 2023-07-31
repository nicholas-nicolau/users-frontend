export function generateRandomEmail(provider='@example.com') {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';

  for (let i = 0; i < 26; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    email += characters[randomIndex];
  }

  email += provider;
  return email;
}
