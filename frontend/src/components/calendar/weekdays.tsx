import {For} from "solid-js";
import {DAYS} from "../../lib/utils/names";

export default function WeekDays() {
    return (
        <For each={DAYS}>
            {
                (day) => (
                    <td class={"text-lg font-medium font-montserrat bg-table-border border-2 border-table-border"}>{day}</td>
                )
            }
        </For>
    )
}