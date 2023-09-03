import { HebreeuwsDatum } from "./hebreeuwsDatum.js";
import { getUitnodiging, getPsalm, getLezingen, getEigen } from "./diensten.js";

const uitnodigingEl = document.getElementById("uitnodiging");
const psalmEl = document.getElementById("psalm");
const ochtendLezingEl = document.getElementById("ochtendLezing");
const middagLezingEl = document.getElementById("middagLezing");
const tijtelEl = document.getElementById("tijtel");
const gebedEl = document.getElementById("gebed");
const benedictus1El = document.getElementById("benedictus1");
const benedictus2El = document.getElementById("benedictus2");
const middagTijtelEl = document.getElementById("middagTijtel");
const middagGebedEl = document.getElementById("middagGebed");
const magnificat1El = document.getElementById("magnificat1");
const magnificat2El = document.getElementById("magnificat2");

const date = new Date();
const hebreeuwsDatum = new HebreeuwsDatum(date);
uitnodigingEl.innerHTML = getUitnodiging(hebreeuwsDatum);
psalmEl.innerHTML = getPsalm(hebreeuwsDatum.maand, hebreeuwsDatum.dag);
const lezingen = getLezingen(hebreeuwsDatum);
ochtendLezingEl.innerHTML = lezingen[0];
middagLezingEl.innerHTML = lezingen[1];
const eigen = getEigen(date);
tijtelEl.innerHTML = eigen.tijtel ?? "";
middagTijtelEl.innerHTML = eigen.middagTijtel ?? eigen.tijtel ?? "";
if (eigen.gebed) {
  gebedEl.innerHTML = `<p><b>Gebed</b> ${eigen.gebed}</p>`;
  middagGebedEl.innerHTML = `<p><b>Gebed</b> ${eigen.middagGebed ?? eigen.gebed}</p>`;
}
if (eigen.gewag) {
  gebedEl.innerHTML += `<p>${eigen.gewag}</p>`;
}
if (eigen.benedictus) {
  benedictus1El.innerHTML = `<p><b>Ant. Ben.</b> ${eigen.benedictus}</p>`;
  benedictus2El.innerHTML = `<p><b>Ant. Ben.</b> ${eigen.benedictus}</p>`;
}
if (eigen.magnificat) {
  magnificat1El.innerHTML = `<p><b>Ant. Mag.</b> ${eigen.magnificat}</p>`;
  magnificat2El.innerHTML = `<p><b>Ant. Mag.</b> ${eigen.magnificat}</p>`;
}
