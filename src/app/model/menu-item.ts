export class MenuItem {
    title: string = "Menu";
    display: string;
    href: string;
    tooltip: string;


    constructor(display: string ="", href: string="", tooltip: string="") {
        this.display = display;
        this.href = href;
        this.tooltip = tooltip;
    }
}
