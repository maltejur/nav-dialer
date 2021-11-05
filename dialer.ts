export default class Dialer {
  private el: HTMLDivElement;
  private _current = 0;
  get current(): number {
    return this._current;
  }
  set current(value: number) {
    this._current = (this.keys.length + value) % this.keys.length;
    this.styleElements();
  }
  get value(): string {
    return this.keys[this.current];
  }
  set value(key: string) {
    this.current = this.keys.indexOf(key);
  }
  keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0", "OK"];

  constructor(el: HTMLElement) {
    this.el = el as HTMLDivElement;
    this.el.innerHTML = "";
    const number = document.createElement("div");
    number.id = "number";
    this.el.appendChild(number);
    this.keys.forEach((key) => {
      const span = document.createElement("span");
      span.innerText = key;
      this.el.appendChild(span);
      this.styleElements();
    });
  }

  styleElements() {
    const spans = this.el.getElementsByTagName("span");
    for (const span of spans) {
      span.classList.remove("active");
    }
    spans[this.current].classList.add("active");
  }
}
