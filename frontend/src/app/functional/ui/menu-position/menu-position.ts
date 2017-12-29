export class MenuPosition {
  constructor(public label: string,
              public onClick: Function,
              public icon: string = null,
              public isVisible = true,
              public disabled = false) {}
}
