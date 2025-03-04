document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const output = document.getElementById("output");

    generateBtn.addEventListener("click", generateIntroduction);

    function generateIntroduction() {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const profession = document.getElementById("profession").value;
        const schooling = document.getElementById("schooling").value;
        const certifications = document.getElementById("certifications").value;
        const achievements = document.getElementById("achievements").value;
        const hobbies = document.getElementById("hobbies").value;
        const introType = document.getElementById("introType").value;

        let intro = "";

        if (introType === "casual") {
            intro = `Hey, I'm ${name}. I'm ${age} years old and work as a ${profession}. I studied at ${schooling}. 
            I love ${hobbies} and have some experience in ${certifications}. One of my key achievements is ${achievements}.`;
        } else if (introType === "professional") {
            intro = `Hello, my name is ${name}. I am a ${profession} with ${age} years of experience. I graduated from ${schooling} 
            and hold certifications in ${certifications}. My notable achievements include ${achievements}. In my free time, I enjoy ${hobbies}.`;
        } else if (introType === "academic") {
            intro = `Hi, I'm ${name}, a student from ${schooling}. I am ${age} years old and currently studying in the field of ${profession}. 
            I have achieved ${achievements} and hold certifications in ${certifications}. My hobbies include ${hobbies}.`;
        } else if (introType === "social") {
            intro = `Hey everyone! I'm ${name}, a ${profession} who loves ${hobbies}. I studied at ${schooling} and hold certifications in ${certifications}. 
            One of my biggest achievements is ${achievements}. Excited to connect with you all!`;
        }

        output.textContent = intro;

        speakText(intro);
    }

    function speakText(text) {
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }

    function startSpeechRecognition() {
        let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (event) {
            let spokenText = event.results[0][0].transcript;
            compareText(output.textContent, spokenText);
        };

        recognition.onerror = function (event) {
            alert("Speech recognition error: " + event.error);
        };
    }

    function compareText(original, spoken) {
        if (original.toLowerCase().trim() === spoken.toLowerCase().trim()) {
            alert("Perfect match! You spoke correctly.");
        } else {
            alert("Mismatch detected. Here’s the correction:\n\n" +
                "Expected: " + original + "\n" +
                "You said: " + spoken);
        }
    }
    const voiceCheckBtn = document.createElement("button");
    voiceCheckBtn.textContent = "Check My Voice";
    voiceCheckBtn.style.marginTop = "10px";
    voiceCheckBtn.onclick = startSpeechRecognition;
    document.body.appendChild(voiceCheckBtn);
});
