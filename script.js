// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const BOT_TOKEN = '6388351983:AAHTgYuZFoiZhxqafqzqTbZ_UZ8yCeGBjkQ';

// Replace 'YOUR_CHANNEL_ID' with your channel's username or ID
const CHANNEL_ID = 'findAITU';

// Function to fetch and display Telegram posts
async function fetchTelegramPosts() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatHistory?chat_id=${CHANNEL_ID}&limit=10`);
        const data = await response.json();

        if (data.ok) {
            const messages = data.result.messages;
            const telegramPosts = document.getElementById('telegram-posts');

            messages.forEach((message) => {
                const postElement = document.createElement('div');
                postElement.classList.add('telegram-post');
                postElement.innerHTML = `
                    <h3>${message.text}</h3>
                    <p>Date: ${new Date(message.date * 1000).toLocaleDateString()}</p>
                `;
                telegramPosts.appendChild(postElement);
            });
        } else {
            console.error('Error fetching Telegram posts:', data.description);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to fetch and display Telegram posts
fetchTelegramPosts();
