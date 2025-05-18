const menuIcon = document.getElementById('menuIcon')
const menuList = document.getElementById('menuList')

const tahun = document.getElementById('tahun');
const deret = document.getElementById('deret');
const regresi = document.getElementById('regresi');
const kirim = document.getElementById('kirim');
const disPrediksi = document.getElementById('disPrediksi');


let chart;
let metodeAktif = 'deret'; // default

const rataRata = 3.9;
const dataPenurunan = [
    { tahun: 2016, penurunan: -12.55 },
    { tahun: 2017, penurunan: -3.69 },
    { tahun: 2018, penurunan: -10.6 },
    { tahun: 2019, penurunan: -12.0 },
    { tahun: 2020, penurunan: -8.59 },
    { tahun: 2021, penurunan: -7.0 },
    { tahun: 2022, penurunan: -10.2 },
    { tahun: 2023, penurunan: -3.9 },
];

menuIcon.addEventListener("click", function(){
    // alert('jawa jawa jawa')
    menuList.classList.toggle('navbar');

})

// Ganti metode saat tombol ditekan
deret.addEventListener("click", function () {
    deret.style.backgroundColor = "#344CB7";
    deret.style.color = "#fff";
    regresi.style.backgroundColor = "#fff";
    regresi.style.color = "#565656"
    metodeAktif = 'deret';
});

regresi.addEventListener("click", function () {
    regresi.style.backgroundColor = "#344CB7";
    regresi.style.color = "#fff";
    deret.style.backgroundColor = "#fff";
    deret.style.color = "#565656"
    metodeAktif = 'regresi';
});

// Fungsi regresi linier
function prediksiRegresi(data, tahunTarget) {
    const n = data.length;
    const sumX = data.reduce((acc, cur) => acc + cur.tahun, 0);
    const sumY = data.reduce((acc, cur) => acc + cur.penurunan, 0);
    const sumXY = data.reduce((acc, cur) => acc + cur.tahun * cur.penurunan, 0);
    const sumX2 = data.reduce((acc, cur) => acc + cur.tahun ** 2, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;

    return slope * tahunTarget + intercept;
}

// Tampilkan grafik berdasarkan metode aktif
function tampilkanGrafik(tahunAwal, tahunAkhir, metode) {
    const labels = [];
    const data = [];

    if (metode === 'deret') {
        let total = 0;
        for (let t = tahunAwal; t <= tahunAkhir; t++) {
            labels.push(t);
            total += rataRata;
            data.push(-total);
        }
    } else if (metode === 'regresi') {
        for (let t = tahunAwal; t <= tahunAkhir; t++) {
            labels.push(t);
            data.push(prediksiRegresi(dataPenurunan, t));
        }
    }

    const dataset = {
        label: metode === 'deret' ? `Deret Penurunan (a = ${rataRata})` : "Prediksi Regresi Linier",
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
                            text: 'Penurunan (cm)'
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

// Jalankan prediksi saat tombol diklik
kirim.addEventListener("click", function () {
    const tahunPrediksi = parseInt(tahun.value);
    const tahunAwal = 2024;

    if (isNaN(tahunPrediksi)) {
        disPrediksi.innerHTML = "Masukkan tahun yang valid!";
        return;
    }
    if (tahunPrediksi <= tahunAwal) {
        disPrediksi.innerHTML = "Masukkan tahun lebih dari 2024!";
        return;
    }
    if (tahunPrediksi >= 2080) {
        disPrediksi.innerHTML = "Tahun terlalu tinggi, prediksi mungkin tidak akurat.";
        return;
    }

    tampilkanGrafik(tahunAwal, tahunPrediksi, metodeAktif);

    if (metodeAktif === 'deret') {
        let total = 0;
        let output = "";
        for (let t = tahunAwal; t <= tahunPrediksi; t++) {
            total += rataRata;
            output += `Tahun ${t}: penurunan ${total.toFixed(2)} cm<br>`;
        }
        disPrediksi.innerHTML = output;
    } else {
        let output = "";
        for (let t = tahunAwal; t <= tahunPrediksi; t++) {
            const hasil = prediksiRegresi(dataPenurunan, t);
            output += `Tahun ${t}: prediksi penurunan ${Math.abs(hasil).toFixed(2)} cm<br>`;
        }
        disPrediksi.innerHTML = output;
    }
});

