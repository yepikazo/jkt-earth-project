const menuIcon = document.getElementById('menuIcon')
const menuList = document.getElementById('menuList')
const tahun = document.getElementById('tahun')
const kirim = document.getElementById('kirim')

menuIcon.addEventListener("click", function(){
    // alert('jawa jawa jawa')
    menuList.classList.toggle('navbar');

})

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

// Fungsi prediksi penurunan tanah
function prediksiPenurunan(data, tahunPrediksi) {
    const n = data.length;
    const sumX = data.reduce((acc, cur) => acc + cur.tahun, 0);
    const sumY = data.reduce((acc, cur) => acc + cur.penurunan, 0);
    const sumXY = data.reduce((acc, cur) => acc + cur.tahun * cur.penurunan, 0);
    const sumX2 = data.reduce((acc, cur) => acc + cur.tahun ** 2, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;

    const hasilPrediksi = slope * tahunPrediksi + intercept;
    return hasilPrediksi.toFixed(2);
}

// Event listener untuk tombol kirim
kirim.addEventListener("click", function () {
    const tahunPrediksi = parseInt(tahun.value);

    // Validasi input
    if (isNaN(tahunPrediksi)) {
        disPrediksi.innerHTML = "Masukkan tahun yang valid!";
        return;
    }
    if (tahunPrediksi <= 2024) {
        disPrediksi.innerHTML = "Masukkan tahun lebih dari 2024!";
        return;
    }
    if (tahunPrediksi >= 2034) {
        disPrediksi.innerHTML = "tahun yang anda masukkan terlalu tinggi, ini dapan menyebabkan prediksi yang tidak akurat";
        return;
    }
    let hasil = prediksiPenurunan(dataPenurunan, tahunPrediksi);
    hasil = Math.abs(hasil)


    disPrediksi.innerHTML = `prediksi penurunan  pada tahun ${tahunPrediksi} adalah ${hasil}cm`;
});