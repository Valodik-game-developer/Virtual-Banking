const supabaseUrl = "https://fqivpdrjfkmdxgegyuie.supabase.co";
const supabaseKey = "sb_publishable_GWz6xHkLI4doDJ3OYzRtfQ_ZPHXF0sP";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


async function register() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    if (username === "" || email === "" || password === "") {
        message.textContent = "Խնդրում ենք լրացնել բոլոր դաշտերը!";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ երկարությամբ!";
        return;
    }

    message.textContent = "Գրանցում...";

    // Создаём аккаунт
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = "Գրանցման սխալ: " + error.message;
        console.error(error);
        return;
    }

    console.log("Օգտագործող:", data.user);

    // Создаём профиль
    const { error: profileError } = await supabaseClient
        .from("profiles")
        .insert({
            id: data.user.id,
            username: username,
            balance: 10000
        });

    if (profileError) {
        message.textContent = "Аккаунт создан, но профиль не создан.";
        console.error("Էջանցումը սխալ է:", profileError);
        return;
    }

    message.textContent =
        "Գրանցումը հաջողությամբ կատարված է!";

    console.log("Профиль создан!");
    window.location.href = "../Html/main.html";
}
