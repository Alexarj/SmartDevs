<script type="module">
  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

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
    const tipo = document.getElementById("tipo").value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) return alert(error.message);

    const user = data.user;

    if (tipo === "dev") {
      await supabase.from("usuarios").insert({
        id: user.id,
        nome,
        email,
        tipo: "dev"
      });
    } else {
      await supabase.from("empresas").insert({
        id: user.id,
        nome,
        email
      });
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
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

    if (error) return alert(error.message);

    await redirectUser();
  };

  // =========================
  // REDIRECIONAMENTO
  // =========================
  async function redirectUser() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { data: dev } = await supabase
      .from("usuarios")
      .select("id")
      .eq("id", user.id)
      .single();

    if (dev) {
      window.location.href = "dashboard-dev.html";
      return;
    }

    const { data: empresa } = await supabase
      .from("empresas")
      .select("id")
      .eq("id", user.id)
      .single();

    if (empresa) {
      window.location.href = "dashboard-empresa.html";
    }
  }

  // =========================
  // PROTEGER ROTAS
  // =========================
  window.checkAuth = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) window.location.href = "login.html";
  };

  // =========================
  // LOGOUT
  // =========================
  window.signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  };
</script>
