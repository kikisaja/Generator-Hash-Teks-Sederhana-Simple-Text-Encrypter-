// --- STATE APLIKASI ---
let currentMode = "encrypt"; // "encrypt" atau "decrypt"

// --- ELEMEN DOM ---
const btnEncrypt = document.getElementById("btn-encrypt");
const btnDecrypt = document.getElementById("btn-decrypt");
const shiftInput = document.getElementById("shift-input");
const inputText = document.getElementById("input-text");
const inputLabel = document.getElementById("input-label");
const outputLabel = document.getElementById("output-label");
const outputBox = document.getElementById("output-box");
const copyBtn = document.getElementById("copy-btn");
const toast = document.getElementById("toast");

// --- LOGIKA ALGORITMA CAESAR CIPHER ---
function caesarCipher(text, shift, isDecrypt = false) {
    if (!text) return "";

    // Jika dekripsi, pergeseran dibalik (negatif)
    let effectiveShift = shift % 26;
    if (isDecrypt) {
        effectiveShift = (26 - effectiveShift) % 26;
    }

    return text
        .split("")
        .map((char) => {
            const code = char.charCodeAt(0);

            // Huruf Besar (A-Z: 65-90)
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + effectiveShift) % 26) + 65);
            }
            // Huruf Kecil (a-z: 97-122)
            else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + effectiveShift) % 26) + 97);
            }

            // Karakter lain (angka, spasi, simbol) tidak diubah
            return char;
        })
        .join("");
}

// --- FUNGSI UPDATE PROSES ---
function processText() {
    const text = inputText.value;
    const shift = parseInt(shiftInput.value) || 0;
    const isDecrypt = currentMode === "decrypt";

    const result = caesarCipher(text, shift, isDecrypt);

    if (result.length > 0) {
        outputBox.textContent = result;
    } else {
        outputBox.innerHTML = `<span class="placeholder-text">Hasil akan muncul otomatis di sini...</span>`;
    }
}

// --- SWITCH MODE ENKRIPSI / DEKRIPSI ---
btnEncrypt.addEventListener("click", () => {
    if (currentMode !== "encrypt") {
        currentMode = "encrypt";
        btnEncrypt.classList.add("active");
        btnDecrypt.classList.remove("active");

        inputLabel.textContent = "Teks Asli (Plaintext):";
        outputLabel.textContent = "Hasil Kode Rahasia (Ciphertext):";
        outputBox.style.backgroundColor = "#facc15"; // Kuning Pop
        processText();
    }
});

btnDecrypt.addEventListener("click", () => {
    if (currentMode !== "decrypt") {
        currentMode = "decrypt";
        btnDecrypt.classList.add("active");
        btnEncrypt.classList.remove("active");

        inputLabel.textContent = "Kode Rahasia (Ciphertext):";
        outputLabel.textContent = "Hasil Teks Terjemahan (Plaintext):";
        outputBox.style.backgroundColor = "#4ade80"; // Hijau Pop
        processText();
    }
});

// --- FITUR COPY TO CLIPBOARD ---
copyBtn.addEventListener("click", () => {
    const textToCopy = outputBox.textContent;

    if (!textToCopy || outputBox.querySelector(".placeholder-text")) {
        showToast("Tidak ada teks untuk disalin!");
        return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Teks berhasil disalin! 🚀");
    }).catch(() => {
        showToast("Gagal menyalin teks.");
    });
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}

// --- EVENT LISTENERS ---
inputText.addEventListener("input", processText);
shiftInput.addEventListener("input", () => {
    // Validasi rentang shift 1-25
    let val = parseInt(shiftInput.value);
    if (val < 1) shiftInput.value = 1;
    if (val > 25) shiftInput.value = 25;
    processText();
});

// Inisialisasi awal
processText();
