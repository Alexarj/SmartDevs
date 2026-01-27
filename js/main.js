// Placeholder para login, cadastro e recuperação de senha
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const cadastroForm = document.getElementById("cadastroForm");
  const recuperarForm = document.getElementById("recuperarForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login simulado!");
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cadastro simulado!");
    });
  }

  if (recuperarForm) {
    recuperarForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Recuperação de senha simulada!");
    });
  }
});
