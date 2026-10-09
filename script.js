// Daftar pilihan resep yang mungkin diminta
const possibleRecipes = [
    ["Roti Bawah", "Keju", "Roti Atas"],
    ["Roti Bawah", "Tomat", "Daging", "Roti Atas"],
    ["Roti Bawah", "Selada", "Keju", "Daging", "Roti Atas"]
];

let currentRecipe = [];
let playerPlate = [];
let score = 0;
let timeLeft = 30;
let timerInterval;
let isPlaying = false;

// Ambil elemen HTML
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const targetRecipeEl = document.getElementById("target-recipe");
const playerPlateEl = document.getElementById("player-plate");

// Memulai game saat halaman dimuat
window.onload = function() {
    startGame();
};

function startGame() {
    score = 0;
    timeLeft = 30;
    isPlaying = true;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;

    generateNewRecipe();
    resetPlate();

    // Jalankan hitung mundur waktu
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isPlaying = false;
            alert(`Waktu Habis! Skor akhir kamu: ${score}`);
            startGame(); // Restart otomatis
        }
    }, 1000);
}

// Pilih resep acak baru
function generateNewRecipe() {
    const randomIndex = Math.floor(Math.random() * possibleRecipes.length);
    currentRecipe = possibleRecipes[randomIndex];
    
    // Tampilkan resep ke layar
    targetRecipeEl.innerHTML = "";
    currentRecipe.forEach(item => {
        const span = document.createElement("span");
        span.textContent = getEmoji(item) + " " + item;
        targetRecipeEl.appendChild(span);
    });
}

// Tambah bahan ke piring pemain
function addIngredient(name, emoji) {
    if (!isPlaying) return;
    
    playerPlate.push(name);
    updatePlateDisplay();
}

// Kosongkan piring
function resetPlate() {
    playerPlate = [];
    updatePlateDisplay();
}

// Perbarui tampilan visual piring
function updatePlateDisplay() {
    playerPlateEl.innerHTML = "";
    
    if (playerPlate.length === 0) {
        playerPlateEl.innerHTML = '<span class="empty-text">Piring masih kosong...</span>';
        return;
    }

    playerPlate.forEach(item => {
        const div = document.createElement("div");
        div.className = "sandwich-layer";
        div.textContent = getEmoji(item) + " " + item;
        playerPlateEl.appendChild(div);
    });
}

// Cek apakah susunan sandwich pemain benar
function submitSandwich() {
    if (!isPlaying) return;

    // Cek apakah jumlah dan urutan bahan sama persis
    const isCorrect = 
        playerPlate.length === currentRecipe.length &&
        playerPlate.every((val, index) => val === currentRecipe[index]);

    if (isCorrect) {
        score += 10;
        scoreEl.textContent = score;
        alert("🎉 Berhasil! Pesanan sesuai!");
        generateNewRecipe();
        resetPlate();
    } else {
        alert("❌ Ups! Susunan bahan atau urutannya salah. Coba lagi!");
    }
}

// Helper untuk ikon emoji bahan
function getEmoji(name) {
    switch(name) {
        case "Roti Bawah": return "🍞";
        case "Roti Atas": return "🍞";
        case "Keju": return "🧀";
        case "Tomat": return "🍅";
        case "Daging": return "🥩";
        case "Selada": return "🥬";
        default: return "🍽️";
    }
}