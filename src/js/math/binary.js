class Binary extends MathBase {
  constructor( scheme = '' ) {
    super( scheme );
    
    if ( scheme.replaceAll( '0', '' ).replaceAll( '1', '' ) )
      throw new TypeError( 'A Binary can only contain 1 and 0.' );
  }

  // Umrechnung Binär → Integer (skript-06: Beispiel 6.5.1)
  toInteger() {
    let result = 0;
    const n = this.scheme.length - 1;

    for ( let i = 0; i <= n; i++ ) {
      if ( this.scheme[i] == '0' )
        continue;

      result += Math.pow( 2, n - i );
    }

    return new Integer( result.toString() );
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

  // Binär → Hexadezimal
  // (https://www.mathe-lexikon.at/mengenlehre/zahlensysteme/binaerzahlen/binaerzahl-in-hexadezimalzahl-umrechnen.html)
  toHex() {
    let values = [];
    let value;
    for ( let i = 0; i < this.scheme.length; i++ ) {
      let exponent = i%4;

      if ( exponent == 0 ) {
        value = { val: 0 };
        values.unshift( value );
      }

      if ( this.scheme[this.scheme.length - 1 - i] == '0' )
        continue;

      value.val += Math.pow( 2, exponent );
    }

    let result = '';
    values.forEach( v => {
      result += this.#toHexSymbol( v.val );
    })

    return result;
  }

  [Symbol.toPrimitive]( hint ) {
    return this.toInteger().valueOf();
  }
}