<script type="module">
  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

  // 🔐 CONFIGURAÇÃO SUPABASE
  const SUPABASE_URL = "https://ynirlpziolginasusolb.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_1cX1yB_sA5aAodDbArwrCw_J6OxoK3l";

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // =========================
  // CADASTRO
  // =========================
  window.signUp = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value; // dev | empresa

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (tipo === "dev") {
      await supabase.from("usuarios").insert({
        id: user.id,
        nome,
        email
      });
    }

    if (tipo === "empresa") {
      await supabase.from("empresas").insert({
        id: user.id,
        nome,
        email
      });
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "dashboard.html";
  };

  // =========================
  // LOGIN
  // =========================
  window.signIn = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "dashboard.html";
  };

  // =========================
  // LOGOUT
  // =========================
  window.signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  };

  // =========================
  // PROTEGER PÁGINA
  // =========================
  window.checkAuth = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "login.html";
    }
  };

  // =========================
  // PEGAR USUÁRIO LOGADO
  // =========================
  window.getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  };
</script>
