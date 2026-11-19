const manual = document.getElementById('x');
const waktu = document.getElementById('waktu');
const sensor = document.getElementById('z');

function cekLampu() {
  let jam = Number(waktu.value) / 60;
  let x = Number(manual.value);
  let y = (jam >= 18 || jam < 6) ? 1 : 0;
  let z = Number(sensor.value);

  // Aljabar Boolean: F = x + yz'
  let notZ = 1 - z;
  let otomatis = y * notZ;
  let hasil = (x === 1 || otomatis === 1) ? 1 : 0;

  document.getElementById('not').textContent = 'z′ = 1 - ' + z + ' = ' + notZ;
  document.getElementById('and').textContent = 'y · z′ = ' + y + ' · ' + notZ + ' = ' + otomatis;
  document.getElementById('or').textContent = 'F = ' + x + ' + ' + otomatis + ' = ' + hasil;

  document.getElementById('jam').textContent = String(jam).padStart(2, '0') + ':00';
  document.getElementById('formula').textContent = 'F = ' + x + ' + (' + y + ' · ' + notZ + ') = ' + hasil;
  document.getElementById('scene').classList.toggle('on', hasil === 1);
  document.getElementById('scene').classList.toggle('day', y === 0);
}

manual.onchange = cekLampu;
sensor.onchange = cekLampu;
waktu.oninput = cekLampu;

cekLampu();
