const supabaseUrl = "https://fqivpdrjfkmdxgegyuie.supabase.co";
const supabaseKey = "sb_publishable_GWz6xHkLI4doDJ3OYzRtfQ_ZPHXF0sP";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    if (email === "" || password === "") {
        message.textContent = "լրացրու բոլոր դաշտերը!";
        return;
    }

    message.textContent = "Մուտք...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = "մուտքի սխալ: " + error.message;
        console.error(error);
        return;
    }

    console.log("Մուտք կատարվել է:", data.user);

    message.textContent = "Մուտք կատարվել է!";
    window.location.href = "../Html/main.html";
}