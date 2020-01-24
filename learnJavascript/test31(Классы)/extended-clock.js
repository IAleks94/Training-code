class ExtendedClock extends Clock {
    constructor(args){
    super(args);
    let { precision = 1000 } = args
    this.precision = precision
    }
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
      }
}