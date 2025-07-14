const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
let lastResponseText = "";
let repeatCount = 0;


function addMessage(text, sender, options = {}) {
    const msgEl = document.createElement('div');
    msgEl.classList.add('chatbot-message', sender);

    if (options.isTyping) {
        msgEl.classList.add('typing');
        chatbotMessages.appendChild(msgEl);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return msgEl;
    }

    if (options.wordByWord) {
        chatbotMessages.appendChild(msgEl);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        const words = text.split(' ');
        let idx = 0;
        msgEl.textContent = '';

        if (options.glitch) {
            msgEl.classList.add('glitch');
        }

        function typeNextWord() {
            if (idx < words.length) {
                msgEl.textContent += (idx === 0 ? '' : ' ') + words[idx];
                idx++;
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                setTimeout(typeNextWord, 30);
            } else {
                if (options.glitch) {
                    setTimeout(() => {
                        msgEl.classList.remove('glitch');
                    }, 1500);
                }

                if (options.flash) {
                    msgEl.classList.add('flash');
                    setTimeout(() => msgEl.classList.remove('flash'), 1500);
                }
            }
        }

        typeNextWord();
        return msgEl;
    }

    // Fallback: show message instantly if no special options
    msgEl.textContent = text;
    chatbotMessages.appendChild(msgEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    if (options.glitch) {
        msgEl.classList.add('glitch');
        setTimeout(() => msgEl.classList.remove('glitch'), 1500);
    }
    if (options.flash) {
        msgEl.classList.add('flash');
        setTimeout(() => msgEl.classList.remove('flash'), 1500);
    }

    return msgEl;
}




function getRudeBotResponse(msg) {
    const m = msg.toLowerCase();

    if (!m.trim()) return "Say something or get lost.";
    if (m.includes("greetings") || m.includes("hi")) return "Wow, social skills. Impressive.";
    if (m.includes("bye")) return "Finally. Some peace and quiet.";
    if (m.includes("scam")) return "You're on Scamtastic. Congrats, Sherlock.";
    if (m.includes("help")) return { text: "I’d love to help, but I won’t.", flash: true };
    if (m.includes("founder")) return "Our founders are wanted in 3 countries. Next question.";
    if (m.includes("refund")) return { text: "YOU DARE?", glitch: true };
    if (m.includes("support")) return "Support? You mean moral or technical?";
    if (m.includes("how") && m.includes("work")) return "Barely.";
    if (m.includes("buy") || m.includes("product")) return "You already did. That's the joke.";
    if (m.includes("crypto")) return "Ah yes, digital regret.";
    if (m.includes("nft")) return "Now Flushed Toilet-paper.";
    if (m.includes("team")) return "Mostly interns. One is a raccoon.";
    if (m.includes("location")) return "Somewhere dark and morally bankrupt.";
    if (m.includes("email")) return "sendit@scamtastic.sus";
    if (m.includes("privacy")) return "Our policy is: LOL.";
    if (m.includes("terms")) return "We have 'em. You didn’t read 'em.";
    if (m.includes("job")) return "You’re hired. Payment in exposure.";
    if (m.includes("price")) return "It costs your trust.";
    if (m.includes("invest")) return "Please don't.";
    if (m.includes("safe")) return "Only for us.";
    if (m.includes("who are you")) return "RudeBot. Your worst customer service rep.";
    if (m.includes("why")) return "Why not?";
    if (m.includes("error")) return "Sounds like your fault.";
    if (m.includes("password")) return { text: "Password? It's 'scamtastic123', obviously.", glitch: true };
    if (m.includes("rickroll")) return { redirect: 'assets/rickroll.mp4', text: "Get rickrolled! >:)", glitch: true };
    if (m.includes("dance")) return { text: "💃🕺 Can't stop, won't stop. *glitch dance*", glitch: true };
    if (m.includes("dance party")) return { text: "Party mode activated! 🎉", flash: true };
    if (m.includes("error 404")) return { text: "Error 404: Help not found.", glitch: true };
    if (m.includes("coffee")) return { text: "Coffee? More like code-fail. ☕", flash: true };
    if (m.includes("hello there")) return { text: "General Kenobi!", flash: true };
    if (m.includes("shutdown")) return { text: "Initiating meltdown sequence... Just kidding. Or am I?", glitch: true };
    if (m.includes("good bot")) return "Flattery will get you nowhere, human.";
    if (m.includes("who made you")) return "Three caffeine-fueled coders with questionable ethics.";
    if (m.includes("time")) return `Time? It's always scam o'clock here. (${new Date().toLocaleTimeString()})`;


    return "I don't have time for your nonsense.";
}

chatbotForm.addEventListener('submit', e => {
    e.preventDefault();
    const userMsg = chatbotInput.value.trim();
    if (!userMsg) return;

    // Show user message instantly
    addMessage(userMsg, 'user');

    // Clear input
    chatbotInput.value = '';

    // Show typing bubble
    const typingEl = addMessage('', 'bot', { isTyping: true });

    setTimeout(() => {
        if (typingEl && typingEl.parentNode) {
            typingEl.parentNode.removeChild(typingEl);
        }

        let response = getRudeBotResponse(userMsg);
        if (response === null) return;

        let text, glitch = false, flash = false;

        if (typeof response === 'string') {
            text = response;
        } else {
            text = response.text;
            glitch = response.glitch;
            flash = response.flash;
        }

        // Repeat tracking
        if (text === lastResponseText) {
            repeatCount++;
        } else {
            repeatCount = 0;
            lastResponseText = text;
        }

        // Escalation
        if (repeatCount === 1) {
            text += " (You already asked that...)";
        } else if (repeatCount === 2) {
            text = "You're seriously asking me *again*? Wow.";
        } else if (repeatCount >= 3) {
            text = "I’m done. Figure it out yourself.";
            glitch = true;
        }

        // Send message
        addMessage(text, 'bot', {
            wordByWord: true,
            glitch,
            flash
        });

    }, 800);

});

