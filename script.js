document.addEventListener("DOMContentLoaded", function () {
    const openChatbotBtn = document.getElementById("open-chatbot");
    const closeChatBtn = document.getElementById("close-chat");
    const chatContainer = document.getElementById("chat-container");
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Open Chatbot
    openChatbotBtn.addEventListener("click", function () {
        chatContainer.classList.remove("hidden");
    });

    // Close Chatbot
    closeChatBtn.addEventListener("click", function () {
        chatContainer.classList.add("hidden");
    });

    // Send Message to OpenAI
    async function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === "") return;

        // Display User Message
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = userText;
        chatBody.appendChild(userMessage);

        userInput.value = "";

        // Fetch OpenAI Response
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }),
        });

        const data = await response.json();

        // Display AI Response
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = data.response;
        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });
});     

function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex";
}

function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}