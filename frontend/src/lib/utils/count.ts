import {Day} from "../types";

export function getEventsCount(days: Day[][]) {

}

export function eventsCountString(count: number): string {
    let suffix = "";

    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        suffix = "ий";
    } else {
        switch (lastDigit) {
            case 1:
                suffix = "ие";
                break;
            case 2:
            case 3:
            case 4:
                suffix = "ия";
                break;
            default:
                suffix = "ий";
                break;
        }
    }

    return `${count} событ${suffix}`;
}