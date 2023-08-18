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
  gebedEl.innerHTML = eigen.gebed;
  middagGebedEl.innerHTML = eigen.middagGebed ?? eigen.gebed;
}
if (eigen.gewag) {
  gebedEl.innerHTML += eigen.gewag;
}
if (eigen.benedictus) {
  benedictus1El.innerHTML = eigen.benedictus;
  benedictus2El.innerHTML = eigen.benedictus;
}
if (eigen.magnificat) {
  magnificat1El.innerHTML = eigen.magnificat;
  magnificat2El.innerHTML = eigen.magnificat;
}
