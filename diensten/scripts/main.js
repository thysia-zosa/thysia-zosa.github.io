import { HebreeuwsDatum } from "./hebreeuwsDatum.js";
import { getUitnodiging, getPsalm, getLezingen } from "./diensten.js";

const uitnodigingEl = document.getElementById("uitnodiging");
const psalmEl = document.getElementById("psalm");
const ochtendLezingEl = document.getElementById("ochtendLezing");
const middagLezingEl = document.getElementById("middagLezing");

const date = new Date();
const hebreeuwsDatum = new HebreeuwsDatum(date);
uitnodigingEl.innerHTML = getUitnodiging(hebreeuwsDatum);
psalmEl.innerHTML = getPsalm(hebreeuwsDatum.maand, hebreeuwsDatum.dag);
const lezingen = getLezingen(hebreeuwsDatum);
ochtendLezingEl.innerHTML = lezingen[0];
middagLezingEl.innerHTML = lezingen[1];
