const cek = document.getElementById("btn-kirim")
const a = document.getElementById("a")
const b = document.getElementById("b")
const notip = document.getElementById("notip")

// DOM prediksi
const tahun = document.getElementById("tahun");
const disTahun = document.getElementById("disTahun");
const disPrediksi = document.getElementById("disPrediksi");
const kirim = document.getElementById("kirim");

// Array penurunan tanah
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
        disTahun.innerHTML = "Masukkan tahun yang valid!";
        disPrediksi.innerHTML = "";
        return;
    }
    if (tahunPrediksi <= 2024) {
        disTahun.innerHTML = "Masukkan tahun lebih dari 2024!";
        disPrediksi.innerHTML = "";
        return;
    }
    // if (tahunPrediksi >= 2034) {
    //     disTahun.innerHTML = "tahun yang anda masukkan terlalu tinggi, ini dapan menyebabkan prediksi yang tidak akurat";
    //     disPrediksi.innerHTML = "";
    //     return;
    // }
    let hasil = prediksiPenurunan(dataPenurunan, tahunPrediksi);
    hasil = Math.abs(hasil)


    disTahun.innerHTML = `Prediksi pada tahun ${tahunPrediksi}`;
    disPrediksi.innerHTML = `penurunan  adalah ${hasil}cm`;
});




//method
// getElementById() digunakan untuk mengambil elemen dengan id tertentu, menghasilkan elemen
//getElementsByTagName() digunakan untuk mengambil elemen dengan ntag tertentu, menghasilkan HTMLcollection
//getElementsByClassName() digunakan untuk mengambil elemen dengan class tertentu, menghasilkan HTMLcollection
//querySelector() digunakan untuk mengambil elemen dengan selector tertentu, menghasilkan elemen pertama yang ditemukan
//querySelectorAll() digunakan untuk mengambil elemen dengan selector tertentu dan mengembalikan array

cek.addEventListener("click", function () {
    const besarData = dataPenurunan.length
    const total = dataPenurunan.reduce((accumulator, currentValue) => accumulator + currentValue.penurunan, 0);
    let rataRata = total / besarData
    rataRata = Math.abs(rataRata)
    // alert(`variabel a = ${a.value + b.value} \n variabel b = ${b.value}`)
    // notip.innerHTML = `variabel a = ${a.value} <br> variabel b = ${b.value} <br> jumlah = ${parseInt(a.value) + parseInt(b.value)}`
    notip.innerHTML = `rata rata tahun = ${rataRata}`
});





//style manipulation
notip.style.fontFamily = "Arial, sans-serif"
notip.style.fontStyle = "italic"
notip.style.color = "red"

blee.style.color = "blue"