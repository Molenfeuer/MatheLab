class Math {
  scheme;
  
  constructor( scheme = '' ) {
    if ( scheme == '' )
      throw new TypeError( 'Constructor arguments have to be not null' );

    this.scheme = scheme;
  }

  validateTag( tag = '', allowedTags = [''] ) {
    let result = null;

    allowedTags.forEach( allowedTag => {
      if ( tag == allowedTag ) {
        result = tag;
      }
    })

    return result;
  }

  checkIfNumber( char ) {
    return !Number.isNaN( Number.parseInt( char ) );
  }

  checkIfNumberSeparator( value = '', index = 0, startIndex = 0 ) {
    return index > startIndex &&
      index <= value.length - 2 &&
      this.checkIfNumber( value[index+1] ) &&
      value[index] == '.'
  }

  checkIfMinusSigns( value = '', index = 0, startIndex = 0 ) {
    return index == startIndex &&
      this.checkIfNumber( value[index+1] ) &&
      value[index] == '-'
  }

  extractNumber( mixedValue = '', startIndex = 0 ) {
    let value = mixedValue.replaceAll( ',', '.' );
    
    if ( startIndex >= value.length ||
      value.split( '.' ).length > 2 )
      return null;
    
    let result = '';
    for ( let i = startIndex; i < value.length; i++ ) {
      let char = value[i];

      if ( !this.checkIfNumber( char ) &&
        !this.checkIfNumberSeparator( value, i, startIndex ) &&
        !this.checkIfMinusSigns( value, i, startIndex ) )
        break;

      result += char;
    }

    return result != '' ? new Number( result ) : null;
  }
}