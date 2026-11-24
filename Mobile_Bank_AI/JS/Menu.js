const supabaseUrl = "https://fqivpdrjfkmdxgegyuie.supabase.co";
const supabaseKey = "sb_publishable_GWz6xHkLI4doDJ3OYzRtfQ_ZPHXF0sP";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


async function loadProfile() {

    // Получаем текущего пользователя
    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        window.location.href = "login.html";
        return;
    }

    console.log("Текущий пользователь:", user);

    // Получаем его профиль
    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("username, balance")
            .eq("id", user.id)
            .single();

    if (profileError) {
        console.error("Ошибка профиля:", profileError);
        document.getElementById("menuMessage").textContent =
            "չստացվեց մուտք գործել պրոֆիլը, փորձեք կրկին";
        return;
    }

    // Показываем данные
    document.getElementById("username").textContent =
        profile.username;

    document.getElementById("balance").textContent =
        profile.balance + " монет";

    console.log("Профиль:", profile);
}


// Выход
async function logout() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error(error);
        return;
    }

    window.location.href = "login.html";
}


// Загружаем профиль при открытии страницы
loadProfile();

// =========================
// ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛОВ
// =========================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }


    // Обновляем баланс в статистике

    const balanceElement =
        document.getElementById("balance");

    const statBalance =
        document.getElementById("statBalance");

    if (balanceElement && statBalance) {

        statBalance.textContent =
            balanceElement.textContent;
    }


    // Имя пользователя на виртуальной карте

    const username =
        document.getElementById("username");

    const cardUsername =
        document.getElementById("cardUsername");

    if (username && cardUsername) {

        cardUsername.textContent =
            username.textContent.toUpperCase();
    }

}


// =========================
// ДЕМО-СООБЩЕНИЕ
// =========================

function demoMessage() {

    alert(
        "Այս ֆունկցիան դեռ ակտիվ չի 🚀"
    );

}


// =========================
// ТЁМНАЯ ТЕМА
// =========================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}