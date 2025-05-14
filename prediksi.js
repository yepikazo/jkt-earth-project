const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');
const warning = document.getElementById('warning');

const tahun = document.getElementById('tahun');
const kirim = document.getElementById('kirim');
const disPrediksi = document.getElementById('disPrediksi');

let chart;
let metodeAktif = 'deret'; // default metode
const rataRata = 3.9; // penurunan per tahun dalam cm
const elevasiAwal = 100; // asumsi elevasi awal 100 mdpl

menuIcon.addEventListener("click", function () {
    menuList.classList.toggle('navbar');
});

warning.addEventListener("click", function () {
    alert ("Peringatan: prediksi ini menggunakan data yang tidak akurat dan hanya untuk tujuan ilustrasi dan pembelajaran. tidak untuk digunakan dalam keputusan penting.");
});

// Fungsi menampilkan grafik penurunan
function tampilkanGrafik(tahunAwal, tahunAkhir, metode) {
    const labels = [];
    const data = [];

    let total = 0;
    for (let t = tahunAwal; t <= tahunAkhir; t++) {
        labels.push(t);
        total += rataRata;
        data.push(-total); // negatif menunjukkan penurunan
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

// Event saat tombol submit diklik
kirim.addEventListener("click", function () {
    const tahunPrediksi = parseInt(tahun.value);
    const tahunAwal = 2024;

    if (isNaN(tahunPrediksi)) {
        disPrediksi.innerHTML = "Masukkan tahun yang valid!";
        return;
    }
    if (tahunPrediksi <= tahunAwal) {
        disPrediksi.innerHTML = ""; // tidak tampilkan hasil untuk tahun 2024 atau kurang
        return;
    }
    if (tahunPrediksi >= 2080) {
        disPrediksi.innerHTML = "Tahun terlalu tinggi, prediksi mungkin tidak akurat.";
        return;
    }

    tampilkanGrafik(tahunAwal, tahunPrediksi, metodeAktif);

    let total = 0;
    for (let t = tahunAwal; t <= tahunPrediksi; t++) {
        total += rataRata;
    }
    const elevasi = elevasiAwal - total / 100; // konversi ke meter
    disPrediksi.innerHTML = `Tahun ${tahunPrediksi}: penurunan ${total.toFixed(2)} cm, elevasi ${elevasi.toFixed(4)} mdpl`;
});

// Grafik default saat halaman dimuat (2015–2024), tanpa hasil prediksi
window.onload = function () {
    const tahunAwal = 2015;
    const tahunAkhir = 2024;
    tampilkanGrafik(tahunAwal, tahunAkhir, metodeAktif);
    disPrediksi.innerHTML = ""; // tidak tampilkan info untuk tahun 2024
};
