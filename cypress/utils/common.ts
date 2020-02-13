export function generateRandomPincode(): string {
    return `${Cypress._.random(11111, 999999)}`;
}

