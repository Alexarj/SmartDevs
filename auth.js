import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ===============================
// 🔐 CONFIG SUPABASE
// ===============================
const SUPABASE_URL = "https://ynirlpziolginasusolb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1cX1yB_sA5aAodDbArwrCw_J6OxoK3l";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// 🔄 VERIFICAR SESSÃO
// ===============================
export async function verificarSessao() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ===============================
// 🔐 PROTEGER PÁGINAS
// ===============================
export async function protegerPagina(tipoEsperado) {
  const session = await verificarSessao();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const userId = session.user.id;

  const { data: perfil } = await supabase
    .from("perfis")
    .select("tipo")
    .eq("user_id", userId)
    .single();

  if (!perfil || perfil.tipo !== tipoEsperado) {
    window.location.href = "index.html";
  }
}

// ===============================
// 🔑 LOGIN
// ===============================
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Erro ao entrar: " + error.message);
    return;
  }

  const { data: perfil } = await supabase
    .from("perfis")
    .select("tipo")
    .single();

  if (perfil.tipo === "dev") {
    window.location.href = "dashboard.html";
  } else {
    window.location.href = "empresa-dashboard.html";
  }
};

// ===============================
// 🆕 CADASTRO
// ===============================
window.cadastrar = async function (tipo) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nome = document.getElementById("nome").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert("Erro no cadastro: " + error.message);
    return;
  }

  await supabase.from("perfis").insert({
    user_id: data.user.id,
    nome,
    tipo // 'dev' ou 'empresa'
  });

  alert("Cadastro criado! Faça login.");
  window.location.href = "login.html";
};

// ===============================
// 🔁 RECUPERAR SENHA
// ===============================
window.recuperarSenha = async function () {
  const email = document.getElementById("email").value;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/login.html"
  });

  if (error) {
    alert("Erro ao enviar email");
  } else {
    alert("Email de recuperação enviado");
  }
};

// ===============================
// 🚪 LOGOUT
// ===============================
window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};
