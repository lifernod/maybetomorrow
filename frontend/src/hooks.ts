import { Month } from "$lib/types";
import type { Transport } from "@sveltejs/kit";

export const transport: Transport = {
  Month: {
    encode: (value) => value instanceof Month && JSON.stringify(value),
    decode: (monthStr) => JSON.parse(monthStr) as Month,
  },
};
