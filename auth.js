<script type="module">
  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

  // =========================
  // CONFIG
  // =========================
  const SUPABASE_URL = "https://ynirlpziolginasusolb.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_1cX1yB_sA5aAodDbArwrCw_J6OxoK3l";

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // =========================
  // HELPERS
  // =========================
  async function getProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("tipo")
      .eq("id", userId)
      .single();

    if (error) return null;
    return data.tipo;
  }

  // =========================
  // LOGIN
  // =========================
  window.login = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const tipo = await getProfile(data.user.id);

    if (tipo === "dev") {
      window.location.href = "/dashboard/dev.html";
    } else if (tipo === "empresa") {
      window.location.href = "/dashboard/empresa.html";
    } else {
      alert("Perfil não encontrado.");
    }
  };

  // =========================
  // CADASTRO
  // =========================
  window.register = async function (tipo) {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      tipo,
      nome,
    });

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Cadastro realizado com sucesso! Faça login.");
    window.location.href = "/login.html";
  };

  // =========================
  // PROTEÇÃO DE PÁGINA
  // =========================
  window.protectPage = async function (tipoEsperado) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/login.html";
      return;
    }

    const tipo = await getProfile(session.user.id);

    if (tipo !== tipoEsperado) {
      window.location.href = "/login.html";
    }
  };

  // =========================
  // LOGOUT
  // =========================
  window.logout = async function () {
    await supabase.auth.signOut();
    window.location.href = "/login.html";
  };
</script>
