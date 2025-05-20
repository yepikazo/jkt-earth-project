const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');

const tahun = document.getElementById('tahun');
const kirim = document.getElementById('kirim');
const disPrediksi = document.getElementById('disPrediksi');
const visual = document.getElementById('visual');

const openwarning = document.getElementById('openwarning');
const closewarning = document.getElementById('closewarning');
const warning = document.getElementById('warning');

let chart;
let metodeAktif = 'deret';
const rataRata = 11; 

menuIcon.addEventListener("click", function () {
    menuList.classList.toggle('navbar');
});

openwarning.addEventListener("click", function () {
    warning.classList.add('open');
});

closewarning.addEventListener("click", function () {
    warning.classList.remove('open');
});

// Fungsi menampilkan grafik penurunan dengan metode deret eksplisit
function tampilkanGrafik(tahunAwal, tahunAkhir, metode) {
    const labels = [];
    const data = [];

    // Tahun awal tetap 2025 sebagai titik awal (0 cm)
    labels.push(2025);
    data.push(0);

    // Mulai dari tahun setelah 2025
    for (let t = tahunAwal; t <= tahunAkhir; t++) {
        const tahunKe = t - tahunAwal + 1;
        const penurunan = rataRata * tahunKe;
        labels.push(t);
        data.push(-penurunan); // negatif menandakan penurunan
    }

    const dataset = {
        label: metode === 'deret' ? `Deret Penurunan (a = ${rataRata} cm/tahun)` : "Prediksi Regresi Linier",
        data: data,
        borderColor: metode === 'deret' ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
        backgroundColor: metode === 'deret' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.3
    };

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets = [dataset];
        chart.update();
    } else {
        const ctx = document.getElementById('myChart');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [dataset]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Total Penurunan (cm)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tahun'
                        }
                    }
                }
            }
        });
    }
}

// Event saat tombol kirim diklik
kirim.addEventListener("click", function () {
    const tahunPrediksi = parseInt(tahun.value);
    const tahunAwal = 2026;

    if (isNaN(tahunPrediksi)) {
        disPrediksi.innerHTML = "Masukkan tahun yang valid!";
        return;
    }
    if (tahunPrediksi < tahunAwal) {
        disPrediksi.innerHTML = "";
        return;
    }
    if (tahunPrediksi > 2035) {
        if (!confirm("Tahun terlalu tinggi, ini menyebabkan prediksi menjadi kurang akurat, apakah anda ingin melanjutkannya?")) {
            return;
        }
    }

    tampilkanGrafik(tahunAwal, tahunPrediksi, metodeAktif);

    const jumlahTahun = tahunPrediksi - tahunAwal + 1;
    const total = rataRata * jumlahTahun;

    disPrediksi.innerHTML = `Tahun ${tahunPrediksi}: penurunan ${total.toFixed(2)} cm`;

    switch (total) {
        case 11: visual.src = "assets/visual_11.png"; break;
        case 22: visual.src = "assets/visual_22.png"; break;
        case 33: visual.src = "assets/visual_33.png"; break;
        case 44: visual.src = "assets/visual_44.png"; break;
        case 55: visual.src = "assets/visual_55.png"; break;
        case 66: visual.src = "assets/visual_66.png"; break;
        case 77: visual.src = "assets/visual_77.png"; break;
        case 88: visual.src = "assets/visual_88.png"; break;
        case 99: visual.src = "assets/visual_99.png"; break;
        case 110: visual.src = "assets/visual_110.png"; break;
        default:
            visual.src = total >= 110 ? "assets/null.png" : "assets/visual_default.jpg";
            break;
    }
});

window.onload = function () {
    const tahunAwal = 2026;
    const tahunAkhir = 2026;
    tampilkanGrafik(tahunAwal, tahunAkhir, metodeAktif);
    disPrediksi.innerHTML = "";
};