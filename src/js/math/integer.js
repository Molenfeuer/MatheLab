class Integer extends MathBase {
  #number;

  constructor( scheme = '' ) {
    super( scheme );
    
    this.#number = ( typeof scheme === 'number' ) ?
      scheme : this.extractNumber( scheme );
    
    if ( !Number.isSafeInteger( this.#number ) )
      throw new TypeError( 'Numbers have to be integer' );
  }

  // Umrechnung Dezimal → Hexadezimalzahl (skript-06: Beispiel 6.5.1)
  toBinary() {
    let a = this.#number;
    let result = [];
    while ( a > 0 ) {
      let remainder = a % 2;
      result.unshift( remainder );

      a = ( a - remainder ) / 2;
    }

    return result.toString().replaceAll( ',', '' );
  }

  #toHexSymbol( value = 0 ) {
    if ( value < 0 || value > 16 )
      return null;
    
    switch( value ) {
      case 10: return 'A';
      case 11: return 'B';
      case 12: return 'C';
      case 13: return 'D';
      case 14: return 'E';
      case 15: return 'F';
      default: return value.toString();
    }
  }

  // Umrechnung Dezimal → Hexadezimalzahl (skript-06: Beispiel 6.5.1)
  toHex() {
    let a = this.#number;
    let result = [''];
    while ( a > 0 ) {
      let remainder = a % 16;
      result.unshift( this.#toHexSymbol( remainder ) );

      a = ( a - remainder ) / 16;
    }

    return result.toString().replaceAll( ',', '' );
  }

  [Symbol.toPrimitive]( hint ) {
    return this.#number;
  }
}