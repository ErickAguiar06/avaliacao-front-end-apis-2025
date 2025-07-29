document.querySelector('.form.login').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('login__username').value;
  const password = document.getElementById('login__password').value;

  // LOGIN
  const loginRes = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
    credentials: 'include'
  });

  const loginData = await loginRes.json();

  if (!loginRes.ok) {
    alert('Usuário ou senha inválidos!');
    return;
  }

  // Salva tokens
  localStorage.setItem('accessToken', loginData.token);
  localStorage.setItem('refreshToken', loginData.refreshToken);

  // Redireciona para posts.html
  window.location.href = './posts.html';
});