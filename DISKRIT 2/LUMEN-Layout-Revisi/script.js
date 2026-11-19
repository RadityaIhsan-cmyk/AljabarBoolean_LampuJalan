const manual = document.getElementById('x');
const waktu = document.getElementById('waktu');
const sensor = document.getElementById('z');
const tabel = document.getElementById('truth');

function cekLampu() {
  let jam = Number(waktu.value) / 60;
  let x = Number(manual.value);
  let y = (jam >= 18 || jam < 6) ? 1 : 0;
  let z = Number(sensor.value);

  // Fungsi Boolean: F = x + yz'
  let notZ = 1 - z;
  let and = y * notZ;
  let hasil = (x === 1 || and === 1) ? 1 : 0;

  document.getElementById('jam').textContent =
    String(jam).padStart(2, '0') + ':00';
  document.getElementById('y').textContent =
    'y = ' + y + ' — ' + (y ? 'Malam' : 'Siang');

  document.getElementById('status').textContent = hasil ? 'MENYALA' : 'MATI';
  document.getElementById('formula').textContent =
    'F = ' + x + ' + ' + and + ' = ' + hasil;

  document.getElementById('scene').classList.toggle('on', hasil === 1);
  document.getElementById('scene').classList.toggle('day', y === 0);

  let alasan = 'Lampu mati karena masih siang.';
  if (x === 1) {
    alasan = 'Lampu menyala karena kendali manual aktif.';
  } else if (y === 1 && z === 0) {
    alasan = 'Lampu menyala otomatis karena sedang malam dan gelap.';
  } else if (y === 1 && z === 1) {
    alasan = 'Lampu mati karena sensor mendeteksi cahaya.';
  }
  document.getElementById('reason').textContent = alasan;

  // Tandai baris tabel yang cocok dengan input
  for (let baris of tabel.rows) {
    baris.classList.toggle('active', baris.dataset.input === '' + x + y + z);
  }
}

// Delapan kombinasi nilai x, y, dan z
for (let x = 0; x <= 1; x++) {
  for (let y = 0; y <= 1; y++) {
    for (let z = 0; z <= 1; z++) {
      let notZ = 1 - z;
      let and = y * notZ;
      let hasil = (x === 1 || and === 1) ? 1 : 0;

      tabel.innerHTML += `
        <tr data-input="${x}${y}${z}">
          <td>${x}</td><td>${y}</td><td>${z}</td>
          <td>${notZ}</td><td>${and}</td><td>${hasil}</td>
          <td>${hasil ? 'Menyala' : 'Mati'}</td>
        </tr>`;
    }
  }
}

manual.onchange = cekLampu;
sensor.onchange = cekLampu;
waktu.oninput = cekLampu;

document.getElementById('reset').onclick = function() {
  manual.value = 0;
  sensor.value = 0;
  waktu.value = 0;
  cekLampu();
};

cekLampu();
