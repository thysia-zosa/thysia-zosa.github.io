const kCyclusCharakter = 17875;
const kMaandCharakter = 13753;
const kEpochCharakter = 5604;
const kCyclusInDagen = 6939;
const kDagenInMaand = 29;
const kDagInChalaqim = 25920;
const kBetutaqpat = 16789;
const kMiddag = 19440;
const kGatrad = 9924;

export class HebreeuwsJaar {
  constructor(jaar) {
    this.jaar = jaar;
    this.vooravondRosjHasjana = HebreeuwsJaar.berekenVooravondRosjHasjana(jaar);
    this.vooravondVolgendRosjHasjana =
      HebreeuwsJaar.berekenVooravondRosjHasjana(jaar + 1);
    this.lengte = this.vooravondVolgendRosjHasjana - this.vooravondRosjHasjana;
    this.weekDag = (this.vooravondRosjHasjana + 1) % 7;
  }

  static berekenVooravondRosjHasjana(jaar) {
    const jaarGetal = jaar - 1;
    const afgelopenCyclussen = Math.floor(jaarGetal / 19);
    const afgelopenCyclusJaren = jaarGetal % 19;
    const afgelopenCyclusMaanden = Math.floor(
      afgelopenCyclusJaren * 12.37 + 0.06
    );
    let chalaqim =
      afgelopenCyclussen * kCyclusCharakter +
      afgelopenCyclusMaanden * kMaandCharakter +
      kEpochCharakter;
    let dagenSindsEpoche =
      afgelopenCyclussen * kCyclusInDagen +
      afgelopenCyclusMaanden * 29 +
      Math.floor(chalaqim / kDagInChalaqim);
    chalaqim = chalaqim % kDagInChalaqim;
    let weekdagGetal = dagenSindsEpoche % 7;

    // Betutaqpat
    if (
      HebreeuwsJaar.isHetEeenSchrikkeljaar(jaar) &&
      weekdagGetal === 0 &&
      chalaqim >= kBetutaqpat
    ) {
      chalaqim = kMiddag;
    }

    // Gatrad
    if (
      !HebreeuwsJaar.isHetEeenSchrikkeljaar(jaar + 1) &&
      weekdagGetal === 1 &&
      chalaqim >= kGatrad
    ) {
      chalaqim = kMiddag;
    }

    // Jach
    if (chalaqim >= kMiddag) {
      dagenSindsEpoche++;
    }

    // Adu
    weekdagGetal = dagenSindsEpoche % 7; // aktualiseering
    if ([2, 4, 6].includes(weekdagGetal)) {
      dagenSindsEpoche++;
    }

    return dagenSindsEpoche;
  }

  static isHetEeenSchrikkeljaar(jaar) {
    return [3, 6, 8, 11, 14, 17, 19].includes(((jaar - 1) % 19) + 1);
  }
}
