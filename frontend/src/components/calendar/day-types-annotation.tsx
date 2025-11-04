import {For} from "solid-js";
import {DAY_TYPES} from "../../lib/utils/names";

export default function DayTypesAnnotation() {
    return (
        <div class={"flex items-center gap-12 mb-2"}>
            <For each={DAY_TYPES}>
                {
                    (type) => (
                        <button class={"flex cursor-pointer items-center justify-center gap-3"}>
                            <div class={`w-6 h-6 ${type.color}`}/>
                            <h1>{type.name}</h1>
                        </button>
                    )
                }
            </For>
        </div>
    )
}