import { Month } from "$lib/types";
import type { Transport } from "@sveltejs/kit";

export const transport: Transport = {
    Month: {
        encode: (value) => value instanceof Month && JSON.stringify(value),
        decode: (monthStr) => monthStr instanceof String && JSON.parse(monthStr.toString()) as Month
    }
}