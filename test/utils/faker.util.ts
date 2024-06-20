import Chance from 'chance';

const chance = new Chance();

export class Faker {
  static email(): string {
    return chance.email();
  }

  static string(length = 10): string {
    return chance.string({ length });
  }

  static integer({ min = 0, max = 100 }): number {
    return chance.integer({ min, max });
  }

  static hash(length = 20): string {
    return chance.hash({ length });
  }

  static username(): string {
    return chance.string({
      length: 10,
      alpha: true,
      numeric: false,
      symbols: false,
    });
  }

  static password(length = 10): string {
    return (
      'a1@' +
      chance.string({
        length,
        alpha: true,
        numeric: true,
        symbols: false,
      })
    );
  }
}
