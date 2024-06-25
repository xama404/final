function untung(invest) {
    const modal = invest;
    //Yang di investasikan 1M (IDR 1.000.000.000)

    const depobank = 350000000;
    const ratedepo = 3.5 / 100 * 2;

    const obligasi = 650000000 * (30 / 100);
    const rateobligasi = 13 / 100 * 2;

    const sahamA = 650000000 * (35 / 100);
    const ratesahamA = 14.5 / 100 * 2;

    const sahamB = 650000000 * (35 / 100);
    const ratesahamB = 12.5 / 100 * 2 ;

    // Menghitung keuntungan untuk setiap investasi
    const untungDepoDuaTahun = depobank * ratedepo;
    const untungObligasiDuaTahun = obligasi * rateobligasi;
    const untungSahamADuaTahun = sahamA * ratesahamA;
    const untungSahamBDuaTahun = sahamB * ratesahamB;

    // Total keuntungan setelah satu tahun
    const totalUntungDuaTahun =untungDepoDuaTahun + untungObligasiDuaTahun + untungSahamADuaTahun + untungSahamBDuaTahun;

    // Karena kita diminta total keuntungan setelah dua tahun dengan bunga majemuk
    const totalUangDuaTahun = modal + totalUntungDuaTahun;

    return totalUangDuaTahun;
}

const totaluntung = untung(1000000000);

console.log(`Total uang investor setelah dua tahun adalah Rp ${totaluntung.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`);
