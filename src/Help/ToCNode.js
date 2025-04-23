

export class ToCNode {
    constructor(text,reference) {
        this.text = text;
        this.reference = reference;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}