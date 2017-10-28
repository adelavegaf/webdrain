/**
 * ACCESSIBILITY HACKS
 */
export default class Accessibility {
    static applyFixes() {
        this.addAriaLabelToContractCardButton();
        this.addAriaLabelToSelectButton();
    }

    static addAriaLabelToContractCardButton() {
        for (let i = 1; i <= 4; i++) {
            const closeButton = document.querySelector('#render-target > div > .row.justify-content-center > div >' +
                                                       ` div:nth-child(${i}) >` +
                                                       ' div > div >' +
                                                       ' div:nth-child(1) > button');
            if (closeButton) {
                closeButton.setAttribute('aria-label', 'contract card button');
            }
        }
    }

    static addAriaLabelToSelectButton() {
        const selectButtons = document.querySelectorAll(
            '.date-selector button');
        for (const button of selectButtons) {
            button.setAttribute('aria-label', 'expand date select dropdown');
        }
    }
}