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
})

closewarning.addEventListener("click", function () {
    warning.classList.remove('open');
})

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
    const tahunAwal = 2025;

    if (isNaN(tahunPrediksi)) {
        disPrediksi.innerHTML = "Masukkan tahun yang valid!";
        return;
    }
    if (tahunPrediksi <= tahunAwal) {
        disPrediksi.innerHTML = "";
        return;
    }
    if (tahunPrediksi > 2035) {
        if (confirm("Tahun terlalu tinggi, ini menyebabkan prediksi menjadi kurang akurat, apakah anda ingin melanjutkanya?") == true){

        } else{
            return;
        }
    }

    if (tahunPrediksi === 2025) {
        const tahunAwal = 2024;
        const tahunAkhir = 2025;
        tampilkanGrafik(tahunAwal, tahunAkhir, metodeAktif);
        disPrediksi.innerHTML = ""; 
    } else{
        tampilkanGrafik(tahunAwal, tahunPrediksi, metodeAktif);
    }

    let total = 0;
    for (let t = tahunAwal; t <= tahunPrediksi; t++) {
        total += rataRata;
    }

    disPrediksi.innerHTML = `Tahun ${tahunPrediksi}: penurunan ${total.toFixed(2)} cm`;

    if (total === 11) {
        visual.src = "assets/visual_11.png";
    } else if (total === 22) {
        visual.src = "assets/visual_22.png";
    } else if (total === 33) {
        visual.src = "assets/visual_33.png";
    } else if (total === 44) {
        visual.src = "assets/visual_44.png";
    } else if (total === 55) {
        visual.src = "assets/visual_55.png";
    } else if (total === 66) {
        visual.src = "assets/visual_66.png";
    } else if (total === 77) {
        visual.src = "assets/visual_77.png";
    } else if (total === 88) {
        visual.src = "assets/visual_88.png";
    } else if (total === 99) {
        visual.src = "assets/visual_99.png";
    } else if (total === 110) {
        visual.src = "assets/visual_110.png";
    } else if (total >= 110) {
        visual.src = "assets/null.png";
    } else {
        visual.src = "assets/visual_default.jpg";
    }
});

window.onload = function () {
    const tahunAwal = 2024;
    const tahunAkhir = 2025;
    tampilkanGrafik(tahunAwal, tahunAkhir, metodeAktif);
    disPrediksi.innerHTML = ""; 
};
