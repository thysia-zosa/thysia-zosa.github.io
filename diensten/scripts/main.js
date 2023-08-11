import { HebreeuwsDatum } from "./hebreeuwsDatum.js";
import { getUitnodiging, getPsalm } from "./diensten.js";

const uitnodigingEl = document.getElementById('uitnodiging');
const psalmEl = document.getElementById('psalm');

const date = new Date();
const hebreeuwsDatum = new HebreeuwsDatum(date);
uitnodigingEl.innerHTML = getUitnodiging(hebreeuwsDatum);
psalmEl.innerHTML = getPsalm(hebreeuwsDatum.maand, hebreeuwsDatum.dag);