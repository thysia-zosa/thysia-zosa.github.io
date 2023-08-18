import { uitnodiging, cantica } from "./uitnodiging.js";
import { psalmen } from "./psalmen.js";
import { lezingen } from "./lezingen.js";
import { profeten } from "./profeten.js";

const feesten = [
  701, 710, 715, 716, 717, 718, 719, 720, 721, 722, 925, 926, 927, 928, 929,
  930, 1001, 1002, 14, 115, 116, 117, 118, 119, 120, 121, 306,
];

const vasten = [13, 114, 417, 509, 703, 1010];

const bijvasten = [12, 113, 415, 416, 507, 508, 702, 1008];

export function getUitnodiging(hebreeuwsDatum) {
  let maandDag = 100 * hebreeuwsDatum.maand + hebreeuwsDatum.dag;

  if (
    feesten.includes(maandDag) ||
    hebreeuwsDatum.dag === 1 ||
    (maandDag === 1003 && hebreeuwsDatum.jaar.lengte % 10 === 3)
  ) {
    return getFeest(maandDag);
  }

  if (hebreeuwsDatum.weekDagNummer === 6) {
    return getSabbat();
  }

  // vasten 17.4 & 9.5 kunnen za/zo, 10.10 alleen zo, 14.1, 3.7 en 13.12 alleen za
  if (
    vasten.includes(maandDag) ||
    (hebreeuwsDatum.weekDagNummer === 6 && bijvasten.includes(maandDag))
  ) {
    return getVasten(hebreeuwsDatum);
  }

  return getWeekDag(maandDag, hebreeuwsDatum.weekDagNummer);
}

function getFeest(maandDag) {
  let antifoon;

  switch (maandDag) {
    case 14:
      antifoon = uitnodiging.loten;
      break;
    case 116:
      antifoon = uitnodiging.eersteSchoof;
      break;
    case 115:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
      antifoon = uitnodiging.ongezuurden;
      break;
    case 306:
      antifoon = uitnodiging.weken;
      break;
    case 601:
      antifoon = uitnodiging.tienden;
      break;
    case 701:
      antifoon = uitnodiging.gedachtenis;
      break;
    case 710:
      antifoon = uitnodiging.verzoendag;
      break;
    case 715:
    case 716:
    case 717:
    case 718:
    case 719:
    case 720:
      antifoon = uitnodiging.loofhutten;
      break;
    case 721:
      antifoon = uitnodiging.hosanna;
      break;
    case 722:
      antifoon = uitnodiging.verzameldag;
      break;
    case 925:
    case 926:
    case 927:
    case 928:
    case 929:
    case 930:
    case 1001:
    case 1002:
    case 1003:
      antifoon = uitnodiging.herinwijding;
      break;
    default:
      antifoon = uitnodiging.nieuweMaan;
      break;
  }

  return `${antifoon}

${cantica.feest}

${antifoon}
`;
}

function getSabbat() {
  return `${uitnodiging.sabbat}

${cantica.sabbat}

${uitnodiging.sabbat}
`;
}

function getVasten(hebreeuwsDatum) {
  let antifoon;

  switch (hebreeuwsDatum.maand) {
    case 0:
      antifoon = uitnodiging.ester;
      break;
    case 1:
      antifoon = uitnodiging.eerstgeborenen;
      break;
    case 5:
      antifoon = uitnodiging.rouwdag;
      break;
    default:
      antifoon = uitnodiging.vasten;
      break;
  }

  return `${antifoon}

${cantica.vasten}

${antifoon}
`;
}

function getWeekDag(maandDag, weekDagNummer) {
  let lofzang = cantica.weekDagen[weekDagNummer];

  let antifoon;
  switch (true) {
    case maandDag > 1115:
      antifoon = uitnodiging.beklimming;
      break;
    case maandDag > 1114:
      antifoon = uitnodiging.bomen;
      break;
    case maandDag > 1002:
      antifoon = uitnodiging.onderwijs;
      break;
    case maandDag > 722:
      antifoon = uitnodiging.aankondiging;
      break;
    case maandDag > 710:
      antifoon = uitnodiging.vervulling;
      break;
    case maandDag > 701:
      antifoon = uitnodiging.inkeer;
      break;
    case maandDag > 601:
      antifoon = uitnodiging.voorbereiding;
      break;
    case maandDag > 515:
      antifoon = uitnodiging.bruid;
      break;
    case maandDag > 514:
      antifoon = uitnodiging.wijnoogst;
      break;
    case maandDag > 509:
      antifoon = uitnodiging.vertroosting;
      break;
    case maandDag > 417:
      antifoon = uitnodiging.droefheid;
      break;
    case maandDag > 306:
      antifoon = uitnodiging.bekendmaking;
      break;
    case maandDag > 121:
      antifoon = uitnodiging.oogst;
      break;
    case maandDag > 15:
      antifoon = uitnodiging.bruidegom;
      break;
    default:
      antifoon = uitnodiging.beklimming;
      break;
  }

  return `${antifoon}

${lofzang}

${antifoon}
`;
}

export function getPsalm(maand, dag) {
  let index = (maand * 29 + dag + 80) % 174;
  let psalm = psalmen[index];

  return `${psalm.antifoon}

${psalm.psalm}

${psalm.antifoon}
`;
}

export function getLezingen(hebreeuwsDatum) {
  const ochtend = getOchtendLezingen(hebreeuwsDatum);
  const middag = getMiddagLezingen(hebreeuwsDatum.volgendeDag());
  return [ochtend, middag];
}

function getOchtendLezingen(hebreeuwsDatum) {
  const jaarIndex =
    hebreeuwsDatum.jaar.weekDag * 1000 + hebreeuwsDatum.jaar.lengte;
  const dag = lezingen[jaarIndex][hebreeuwsDatum.dagVanHetJaar - 1];
  if (!dag.lezing && !dag.vervolg && !dag.evangelie) {
    return "";
  }
  const lezing = dag.lezing ? dag.lezing + "<br />" : "";
  const vervolg = dag.vervolg ? dag.vervolg + "<br />" : "";
  const evangelie = dag.evangelie ? dag.evangelie + "<br />" : "";
  return `<h4>Lezingen</h4>
  <h5 class="abschnitt"><i>${lezing}${vervolg}${evangelie}</i></h5>
`;
}

function getMiddagLezingen(hebreeuwsDatum) {
  const jaarIndex =
    hebreeuwsDatum.jaar.weekDag * 1000 + hebreeuwsDatum.jaar.lengte;
  const dag = lezingen[jaarIndex][hebreeuwsDatum.dagVanHetJaar - 1];
  let halfJaarIndex = (hebreeuwsDatum.jaar.jaar * 2 - 2) % 7;
  let maandIndex = hebreeuwsDatum.maand;
  let dagIndex = hebreeuwsDatum.dag;
  if (maandIndex === 12) {
    maandIndex = 0;
    halfJaarIndex = 7;
  } else {
    halfJaarIndex += Math.floor(maandIndex/6);
    maandIndex %= 6;
    if (dagIndex === 30) {
      dagIndex = 0;
      maandIndex = ++maandIndex % 6;
    }
    if (maandIndex === 0) {
      halfJaarIndex = ++halfJaarIndex % 7;
    }
  }
  const profeet = profeten[halfJaarIndex][maandIndex][dagIndex];
  return `<h4>Lezingen</h4>
  <h5 class="abschnitt"><i>${dag.wet}<br />${profeet}<br />${dag.apostel}</i></h5>`;
}
