const x = document.getElementById('x');
const y = document.getElementById('y');
const z = document.getElementById('z');
const waktu = document.getElementById('waktu');

let menit = 0;

function cekLampu() {
  let jam = Math.floor(menit / 60);
  let m = Math.floor(menit % 60);
  let a = Number(x.value);
  let b = Number(jam >= 18 || jam < 6); // y = 1 saat malam
  let c = Number(z.value);

  let notZ = 1 - c;
  let and = b * notZ;
  let F = Number(Boolean(a || and));

  document.getElementById('jam').textContent = `${String(jam).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  y.textContent = `y = ${b} — ${b ? 'Malam' : 'Siang'}`;
  waktu.value = String(Math.floor(menit));

  document.getElementById('not').textContent = `z′ = NOT ${c} = ${notZ}`;
  document.getElementById('and').textContent = `y · z′ = ${b} · ${notZ} = ${and}`;
  document.getElementById('or').textContent = `F = ${a} + ${and} = ${F}`;
  document.getElementById('formula').textContent = `F = ${a} + (${b} · ${notZ}) = ${F}`;
  document.getElementById('status').textContent = F ? 'Lampu Menyala' : 'Lampu Mati';
  document.getElementById('pill').textContent = F ? 'ON' : 'OFF';
  document.getElementById('pill').classList.toggle('off', !F);
  document.getElementById('scene').classList.toggle('on', Boolean(F));
  document.getElementById('scene').classList.toggle('day', b === 0);
  document.getElementById('weather').textContent = `${b ? 'MALAM' : 'SIANG'} · ${c ? 'TERANG' : 'GELAP'}`;

  let alasan = 'Mode otomatis: timer siang, lampu tetap mati.';
  if (a === 1) alasan = 'Kendali manual aktif: lampu dipaksa menyala.';
  else if (b === 1 && c === 0) alasan = 'Malam dan gelap: kedua syarat otomatis terpenuhi.';
  else if (b === 1) alasan = 'Malam tetapi terang: lampu tetap mati.';
  document.getElementById('reason').textContent = alasan;

  document.querySelectorAll('#truth tr').forEach(baris => {
    baris.classList.toggle('active', baris.dataset.input === `${a}${b}${c}`);
  });
}

const tabel = document.getElementById('truth');
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      let notZ = 1 - c;
      let and = b * notZ;
      let F = Number(Boolean(a || and));
      tabel.innerHTML += `<tr data-input="${a}${b}${c}"><td>${a}</td><td>${b}</td><td>${c}</td><td>${notZ}</td><td>${and}</td><td>${F}</td><td>${F ? 'Menyala' : 'Mati'}</td></tr>`;
    }
  }
}

[x, z].forEach(input => input.addEventListener('change', cekLampu));


waktu.addEventListener('input', () => {
  menit = Number(waktu.value);
  cekLampu();
});

document.getElementById('reset').addEventListener('click', () => {
  x.value = '0';
  z.value = '0';
  menit = 0;
  cekLampu();
});

cekLampu();
