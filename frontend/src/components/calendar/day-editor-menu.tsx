import {Day} from "../../lib/types";
import {Match, Switch, createSignal, Index} from "solid-js";

type DayEditorMenuProps = {
    day: Day,
    handleClose: () => void,
};

export default function DayEditorMenu(props: DayEditorMenuProps) {
    const [newEvents, setNewEvents] = createSignal([]);
    const events = () => [...props.day.events, ...newEvents()];

    const [newEventTitle, setNewEventTitle] = createSignal("");
    const [newEventDescription, setNewEventDescription] = createSignal<string>();

    function addNewEvent() {
        // setNewEvents(prev => [...prev, { title: newEventTitle(), description: newEventDescription() }]);
        // setNewEventTitle("");
        // setNewEventDescription("");
    }

    return (
        <div class={"absolute bg-gray-100/60 top-0 h-full w-full z-10"}>
            <section class={"bg-white py-8 px-16 mt-20 w-1/2 mx-auto rounded"}>
                <h1 class={"text-center font-medium mb-5"}>Планы на {props.day.day_number} число</h1>
                <Switch>
                    <Match when={events().length === 0}>
                        <h1>Планов нет, отдыхаем!</h1>
                    </Match>
                    <Match when={events().length !== 0}>
                        <h1>Запланировано {events().length} дел</h1>
                        <Index each={events()}>
                            {
                                (event) => (
                                    <div>
                                        <h1>{event()}</h1>
                                    </div>
                                )
                            }
                        </Index>
                    </Match>
                </Switch>

                <button onClick={() => addNewEvent()} class={"w-full py-2 border border-dashed rounded border-amber-600 mt-2"}>+</button>

                <button class={"w-full bg-table-border py-2 mt-5 rounded"} onClick={() => props.handleClose()}>Close</button>
            </section>
        </div>
    )
}