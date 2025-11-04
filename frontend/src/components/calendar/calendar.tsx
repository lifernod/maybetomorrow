import {createSignal, For, Index, Show} from "solid-js";
import {Day, DayType} from "../../lib/types";
import {eventsCountString} from "../../lib/utils/count";
import DayEditorMenu from "./day-editor-menu";

type CalendarProps = {
    days: Day[][],
    changeDay: (day: Day) => void,
};

export default function Calendar(props: CalendarProps) {
    const [editingDay, setEditingDay] = createSignal<Day | undefined>();

    return (
        <>
            <Show when={editingDay()}>
                {
                    (day) => (
                        <DayEditorMenu day={day()} handleClose={() => setEditingDay(undefined)} />
                    )
                }
            </Show>
            <For each={props.days}>
                {
                    (week) => (
                        <tr>
                            <Index each={week}>
                                {
                                    (day) => (
                                        <td classList={{
                                            "bg-table-undefined font-medium border-2 border-table-border": day().day_type == DayType.Undefined && day().events.length === 0,
                                            "bg-table-free font-medium border-2 border-table-border": day().day_type == DayType.Free,
                                            "bg-table-busy font-medium border-2 border-table-border": day().day_type == DayType.Busy || day().events.length > 0,
                                            "bg-table-uneditable font-medium border-2 border-table-border": day().day_type == DayType.Uneditable,

                                        }}
                                            onClick={[setEditingDay, day()]}>

                                            <div class={"flex flex-col items-center"}>
                                                <h1 class={"mb-5 text-lg"}>{day().day_number}</h1>
                                                <Show when={day().events.length !== 0}>
                                                    <h3 class={"text-sm py-1 px-4 bg-amber-500 rounded-full"}>{day().events.length}</h3>
                                                </Show>
                                            </div>

                                        </td>
                                    )
                                }
                            </Index>
                        </tr>
                    )
                }
            </For>
        </>
    )
}