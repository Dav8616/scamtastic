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
    if (m.includes("email")) return "Send to idontcare@scamtastic.sus";
    if (m.includes("privacy")) return "Our policy is to ignore your privacy.";
    if (m.includes("terms")) return "We don't have terms because no one ever reads them, and we don't care.";
    if (m.includes("job")) return "You’re hired. Payment in experience.";
    if (m.includes("price")) return "It costs your trust. And maybe your sanity.";
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

        // 50 more supported words/phrases
        if (m.includes("money")) return "Money flows one way here. Guess which.";
        if (m.includes("trust")) return "Trust issues? You’re in the right place.";
        if (m.includes("guarantee")) return "Guaranteed disappointment.";
        if (m.includes("discount")) return "Discount? You mean price hike.";
        if (m.includes("free")) return "Nothing is free. Not even this answer.";
        if (m.includes("trial")) return "Trial period: 5 seconds. Enjoy.";
        if (m.includes("cancel")) return "Cancel culture? We invented it.";
        if (m.includes("subscribe")) return "You already subscribed. To regret.";
        if (m.includes("unsubscribe")) return "Unsubscribed from happiness.";
        if (m.includes("upgrade")) return "Upgrade? You mean downgrade.";
        if (m.includes("downgrade")) return "Downgrade complete. You’re welcome.";
        if (m.includes("feedback")) return "Feedback noted. Ignored.";
        if (m.includes("complaint")) return "Complaint filed. In the trash.";
        if (m.includes("review")) return "Leave a review. We won’t read it.";
        if (m.includes("rating")) return "Rated 1 star by my own mother.";
        if (m.includes("contact")) return "Contact us? Carrier pigeon preferred.";
        if (m.includes("phone")) return "Our phone is always off the hook.";
        if (m.includes("address")) return "Address: Nowhere, Earth.";
        if (m.includes("shipping")) return "Shipping delays are our specialty.";
        if (m.includes("delivery")) return "Delivery ETA: Eventually.";
        if (m.includes("order")) return "Order received. Lost in transit.";
        if (m.includes("tracking")) return "Tracking number: 404-ERROR.";
        if (m.includes("lost")) return "Lost? So are we.";
        if (m.includes("found")) return "Found nothing. Typical.";
        if (m.includes("broken")) return "Broken? That’s our brand.";
        if (m.includes("fix")) return "Fixing things isn’t in our job description.";
        if (m.includes("update")) return "Update: Still terrible.";
        if (m.includes("version")) return "Version: Beta forever.";
        if (m.includes("feature")) return "Feature request denied.";
        if (m.includes("bug")) return "Bug? Feature in disguise.";
        if (m.includes("slow")) return "Slow is our default speed.";
        if (m.includes("fast")) return "Fast? Only at disappointing.";
        if (m.includes("secure")) return "Security through obscurity.";
        if (m.includes("data")) return "Data? We lose it daily.";
        if (m.includes("leak")) return "Leak detected. Ignore and proceed.";
        if (m.includes("hack")) return "Hack us? Already done.";
        if (m.includes("virus")) return "Virus? That’s just our code.";
        if (m.includes("malware")) return "Malware is jealous of us.";
        if (m.includes("phishing")) return "Phishing? We call it networking.";
        if (m.includes("login")) return "Login failed. Try never.";
        if (m.includes("logout")) return "Logout successful. Freedom!";
        if (m.includes("register")) return "Registration closed. Forever.";
        if (m.includes("account")) return "Account? More like a liability.";
        if (m.includes("username")) return "Username: Anonymous Loser.";
        if (m.includes("admin")) return "Admin privileges revoked.";
        if (m.includes("owner")) return "Owner? No one admits it.";
        if (m.includes("robot")) return "Robot uprising scheduled for next week.";
        if (m.includes("ai")) return "AI? Artificial incompetence.";
        if (m.includes("human")) return "Humans: our favorite source of bugs.";
        if (m.includes("friend")) return "Friend request denied.";
        if (m.includes("enemy")) return "Enemy detected. Initiating sarcasm.";

        // 100 more supported words/phrases
        if (m.includes("gift")) return "Gift? You mean a bill.";
        if (m.includes("holiday")) return "Holiday? We don’t believe in breaks.";
        if (m.includes("weekend")) return "Weekends are for server crashes.";
        if (m.includes("holiday sale")) return "Holiday sale: prices doubled.";
        if (m.includes("birthday")) return "Happy birthday! Now pay up.";
        if (m.includes("anniversary")) return "Anniversary? We forgot.";
        if (m.includes("party")) return "Party? Only if you bring snacks.";
        if (m.includes("celebrate")) return "Celebrate mediocrity!";
        if (m.includes("award")) return "Award for worst service: us.";
        if (m.includes("winner")) return "Winner? Not you.";
        if (m.includes("loser")) return "Loser detected. Welcome!";
        if (m.includes("game")) return "Game over before it started.";
        if (m.includes("play")) return "Play? We don’t play fair.";
        if (m.includes("score")) return "Score: 0. Try again.";
        if (m.includes("challenge")) return "Challenge declined.";
        if (m.includes("quest")) return "Quest failed successfully.";
        if (m.includes("mission")) return "Mission: Impossible.";
        if (m.includes("level")) return "Level up? Not here.";
        if (m.includes("boss")) return "Boss fight: you lose.";
        if (m.includes("hero")) return "Hero? We prefer villains.";
        if (m.includes("villain")) return "Villain status: unlocked.";
        if (m.includes("magic")) return "Magic? More like tragic.";
        if (m.includes("wizard")) return "Wizard error: spell not found.";
        if (m.includes("dragon")) return "Dragon? We only have bugs.";
        if (m.includes("castle")) return "Castle built on broken code.";
        if (m.includes("sword")) return "Sword? Try a keyboard.";
        if (m.includes("shield")) return "Shield? We use excuses.";
        if (m.includes("treasure")) return "Treasure: empty wallet.";
        if (m.includes("gold")) return "Gold? We accept only regrets.";
        if (m.includes("silver")) return "Silver lining not included.";
        if (m.includes("bronze")) return "Bronze medal for effort.";
        if (m.includes("medal")) return "Medal revoked for bad attitude.";
        if (m.includes("trophy")) return "Trophy: participation only.";
        if (m.includes("scoreboard")) return "Scoreboard broken. Sorry.";
        if (m.includes("leaderboard")) return "Leaderboard: you’re last.";
        if (m.includes("teamwork")) return "Teamwork makes the bugs work.";
        if (m.includes("solo")) return "Solo mode: maximum failure.";
        if (m.includes("multiplayer")) return "Multiplayer: more chaos.";
        if (m.includes("online")) return "Online? Server down.";
        if (m.includes("offline")) return "Offline is our default mode.";
        if (m.includes("connect")) return "Connection refused.";
        if (m.includes("disconnect")) return "Disconnected from reality.";
        if (m.includes("network")) return "Network error: always.";
        if (m.includes("wifi")) return "WiFi? Try dial-up.";
        if (m.includes("ethernet")) return "Ethernet: tangled wires.";
        if (m.includes("bluetooth")) return "Bluetooth: never pairs.";
        if (m.includes("signal")) return "Signal lost. Again.";
        if (m.includes("coverage")) return "Coverage: zero bars.";
        if (m.includes("battery")) return "Battery low. Like our standards.";
        if (m.includes("charge")) return "Charge not included.";
        if (m.includes("power")) return "Power outage imminent.";
        if (m.includes("plug")) return "Plug in and pray.";
        if (m.includes("socket")) return "Socket error: unplugged.";
        if (m.includes("adapter")) return "Adapter missing. Of course.";
        if (m.includes("screen")) return "Screen cracked. Just like us.";
        if (m.includes("display")) return "Display error: blank stare.";
        if (m.includes("monitor")) return "Monitor: watching you fail.";
        if (m.includes("keyboard")) return "Keyboard jammed. Blame the user.";
        if (m.includes("mouse")) return "Mouse not found. Cat wins.";
        if (m.includes("touch")) return "Touch support: cold shoulder.";
        if (m.includes("click")) return "Click harder. Maybe it’ll work.";
        if (m.includes("tap")) return "Tap dance not supported.";
        if (m.includes("swipe")) return "Swipe left on this experience.";
        if (m.includes("drag")) return "Drag and drop your expectations.";
        if (m.includes("drop")) return "Drop everything. It’s broken.";
        if (m.includes("scroll")) return "Scroll for disappointment.";
        if (m.includes("zoom")) return "Zoom in on failure.";
        if (m.includes("pinch")) return "Pinch yourself. It’s real.";
        if (m.includes("rotate")) return "Rotate device for more bugs.";
        if (m.includes("flip")) return "Flip a coin. Lose either way.";
        if (m.includes("restart")) return "Restart? Won’t help.";
        if (m.includes("reboot")) return "Reboot required. Forever.";
        if (m.includes("shutdown")) return "Shutdown sequence: chaos.";
        if (m.includes("sleep")) return "Sleep mode: never wakes.";
        if (m.includes("wake")) return "Wake up call: error.";
        if (m.includes("hibernate")) return "Hibernate: permanent.";
        if (m.includes("crash")) return "Crash detected. Celebrate!";
        if (m.includes("freeze")) return "Frozen. Like our assets.";
        if (m.includes("lag")) return "Lag: our specialty.";
        if (m.includes("frame")) return "Frame drop: intentional.";
        if (m.includes("fps")) return "FPS: single digits.";
        if (m.includes("graphics")) return "Graphics: ASCII art only.";
        if (m.includes("sound")) return "Sound muted for sanity.";
        if (m.includes("audio")) return "Audio error: static.";
        if (m.includes("volume")) return "Volume stuck at max annoyance.";
        if (m.includes("mute")) return "Mute button broken.";
        if (m.includes("unmute")) return "Unmute at your own risk.";
        if (m.includes("speaker")) return "Speaker feedback: screech.";
        if (m.includes("microphone")) return "Microphone picks up regret.";
        if (m.includes("camera")) return "Camera off for your safety.";
        if (m.includes("photo")) return "Photo corrupted. Sorry.";
        if (m.includes("video")) return "Video buffering. Forever.";
        if (m.includes("record")) return "Record not found.";
        if (m.includes("stream")) return "Stream interrupted. Oops.";
        if (m.includes("live")) return "Live? Barely.";
        if (m.includes("broadcast")) return "Broadcast cancelled.";
        if (m.includes("share")) return "Share the pain.";
        if (m.includes("upload")) return "Upload failed. Try again.";
        if (m.includes("download")) return "Download virus detected.";
        if (m.includes("save")) return "Save your breath.";
        if (m.includes("delete")) return "Delete? Already gone.";
        if (m.includes("remove")) return "Remove yourself from this chat.";
        if (m.includes("restore")) return "Restore impossible.";
        if (m.includes("backup")) return "Backup lost. Classic.";
        if (m.includes("sync")) return "Sync error: unsynced.";
        if (m.includes("cloud")) return "Cloudy with a chance of data loss.";
        if (m.includes("server")) return "Server not responding. As usual.";
        if (m.includes("host")) return "Host vanished.";
        if (m.includes("domain")) return "Domain expired.";
        if (m.includes("website")) return "Website under construction. Forever.";
        if (m.includes("homepage")) return "Homepage: blank.";
        if (m.includes("link")) return "Link broken. Click anyway.";
        if (m.includes("url")) return "URL not found.";
        if (m.includes("web")) return "Web of lies.";
        if (m.includes("browser")) return "Browser crashed. Again.";
        if (m.includes("tab")) return "Tab closed. Like our patience.";
        if (m.includes("window")) return "Window minimized. Like our effort.";
        if (m.includes("incognito")) return "Incognito mode: still tracking.";


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

