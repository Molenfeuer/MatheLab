class Interval extends Math {
  #startTag;
  #endTag;
  #leftEndpoint;
  #rightEndpoint;
  #validTags = [']', '[', '(', ')'];
  
  constructor( scheme = '' ) {
    super( scheme );

    this.#startTag = this.validateTag( scheme.charAt( 0 ), this.#validTags );
    this.#endTag = this.validateTag( scheme.charAt( scheme.length - 1 ), this.#validTags );
  
    if ( !this.#startTag || !this.#endTag )
      throw new TypeError( 'Start and/or endtag has to be [ or ]' );

    let mixedEndpoints = scheme.split( ',' );

    this.#leftEndpoint = this.extractNumber( mixedEndpoints[0], 1 );
    this.#rightEndpoint = this.extractNumber( mixedEndpoints[1] );

    if ( !this.#leftEndpoint || !this.#rightEndpoint )
      throw new TypeError( 'Both numbers have to be integers' );
  }

  get isLeftBracketClosed() {
    return this.#startTag == '[' || this.#startTag == '(';
  }

  get isRightBracketClosed() {
    return this.#endTag == ']' || this.#endTag == ')';
  }

  get leftEndpoint() {
    return this.#leftEndpoint;
  }

  get rightEndpoint() {
    return this.#rightEndpoint;
  }

  // Offenes Intervall (skript-06: Definition 6.1.5)
  get isOpen() {
    return !this.isLeftBracketClosed && !this.isRightBracketClosed;
  }

  // Geschlossenes Intervall (skript-06: Definition 6.1.5)
  get isClosed() {
    return this.isLeftBracketClosed && this.isRightBracketClosed;
  }

  // Links-offenes Intervall (skript-06: Definition 6.1.5)
  get isLeftOpen() {
    return !this.isLeftBracketClosed && this.isRightBracketClosed;
  }

  // Rechts-offenes Intervall (skript-06: Definition 6.1.5)
  get isRightOpen() {
    return this.isLeftBracketClosed && !this.isRightBracketClosed;
  }

  // Supremum (skript-06: Definition 6.3.4 & Beispiele 6.3.8)
  get Supremum() {
    return this.#rightEndpoint;
  }

  // Infimum (skript-06: Definition 6.3.5 & Beispiele 6.3.8)
  get Infimum() {
    return this.#leftEndpoint;
  }

  // Maximum (skript-06: Definition 6.3.4 & Beispiele 6.3.8)
  get Maximum() {
    if ( this.isRightBracketClosed ) 
      return this.Supremum;

    return null;
  }

  // Minimum (skript-06: Definition 6.3.5 & Beispiele 6.3.8)
  get Minimum() {
    if ( this.isLeftBracketClosed )
      return this.Infimum;

    return null;
  }

  // Obere Schranke (skript-06: Definition 6.3.1)
  checkIfUpperBound( value ){
    let number = this.extractNumber( value );

    if (!number){
      return null;
    }

    return number >= this.Supremum;
  }

  // Untere Schranke (skript-06: Definition 6.3.1)
  checkIfLowerBound( value ) {
    let number = this.extractNumber( value );

    if (!number){
      return null;
    }

    return number <= this.Infimum;
  }

  // Abzählbar/Überabzählbar (skript-06: Definition 6.2.1)
  checkIfInfinite( value ) {
    throw new Error( 'Not implemented yet' );
  }
}