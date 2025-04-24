

/**
 * @typedef {ToCNode} - A node of the tree structure used to organize the Table of Contents.
 */
export class ToCNode {
    /**
     * 
     * @param {string} text - Name of the chapter or section
     * @param {HTMLElementRef} reference - reference to the div that the chapter should scroll to.
     */
    constructor(text,reference) {
        this.text = text;
        this.reference = reference;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}