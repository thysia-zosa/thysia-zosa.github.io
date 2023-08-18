import { HebreeuwsJaar } from "./hebreeuwsJaar.js";

const kHebreeuwseMaandLengte = 765433 / 25920;
const kHebreeuwseJaarLengte = 235 / 19;
const kJaarNullJuliaansDatum = 1721117;
const kGregoriaansJuliaansDatum = 2299170;
const kCyclusInMaanden = 235;
const kHebreeuwsJuliaansDatum = 347997;
const kCyclusInJaaren = 19;

export class HebreeuwsDatum {
  constructor(date) {
    this.date = date;
    this.juliaansDatum = HebreeuwsDatum.berekenJuliaansDatum(date);
    this.weekDagNummer = HebreeuwsDatum.weekDagVanJuliaansDatum(
      this.juliaansDatum
    );
    const hebreeuwsDatum = HebreeuwsDatum.berekenHebreeuwsDatum(
      this.juliaansDatum
    );
    this.jaar = hebreeuwsDatum.jaar;
    this.maand = hebreeuwsDatum.maand;
    this.dag = hebreeuwsDatum.dag;
    this.dagVanHetJaar =
      this.juliaansDatum -
      kHebreeuwsJuliaansDatum -
      this.jaar.vooravondRosjHasjana;
  }

  volgendeDag() {
    return new HebreeuwsDatum(
      new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1)
    );
  }

  static berekenJuliaansDatum(date) {
    let maand = (date.getMonth() + 10) % 12;
    let jaar = date.getFullYear();
    if (maand > 9) {
      jaar--;
    }
    let juliaansDatum =
      Math.floor(jaar * 365.25) +
      Math.floor(maand * 30.6 + 0.5) +
      date.getDate() +
      kJaarNullJuliaansDatum;
    if (juliaansDatum > kGregoriaansJuliaansDatum) {
      juliaansDatum += 2 + Math.floor(jaar / 400) - Math.floor(jaar / 100);
    }
    return juliaansDatum;
  }

  static weekDagVanJuliaansDatum(juliaansDatum) {
    return (juliaansDatum + 1) % 7;
  }

  static berekenHebreeuwsDatum(juliaansDatum) {
    const dagenSindsEpoche = juliaansDatum - kHebreeuwsJuliaansDatum;
    let maandGetal = Math.floor(dagenSindsEpoche / kHebreeuwseMaandLengte);
    const afgelopenCyclussen = Math.floor((maandGetal - 1) / kCyclusInMaanden);
    maandGetal -= afgelopenCyclussen * kCyclusInMaanden;
    let jaarGetal =
      1 +
      afgelopenCyclussen * kCyclusInJaaren +
      Math.floor((maandGetal + 0.94) / kHebreeuwseJaarLengte);
    let jaar = new HebreeuwsJaar(jaarGetal);
    if (jaar.vooravondRosjHasjana >= dagenSindsEpoche) {
      jaar = new HebreeuwsJaar(--jaarGetal);
    }

    const dagInDitJaar = dagenSindsEpoche - jaar.vooravondRosjHasjana;
    let dagGetal = (dagInDitJaar + 205) % jaar.lengte;

    if (dagGetal < 265) {
      dagGetal++;
      maandGetal = Math.floor(dagGetal / 29.55);
      dagGetal -= Math.floor(maandGetal * 29.5);
    } else {
      dagGetal -= 264;
      switch (jaar.lengte) {
        case 353:
        case 383:
          maandGetal = Math.floor((dagGetal + 0.15) / 29.55);
          dagGetal -= Math.floor(maandGetal * 29.4);
          maandGetal += 9;
          break;
        case 354:
        case 384:
          maandGetal = Math.floor((dagGetal - 0.95) / 29.52);
          dagGetal -= Math.floor(maandGetal * 29.5 + 0.9);
          maandGetal += 9;
          break;
        case 355:
        case 385:
          maandGetal = Math.floor((dagGetal - 1.95) / 29.52) + 1;
          dagGetal += 29 - Math.floor(maandGetal * 29.6 + 0.9);
          maandGetal += 8;
          break;

        default:
          break;
      }
    }

    return {
      jaar: jaar,
      maand: maandGetal,
      dag: dagGetal,
    };
  }
}
