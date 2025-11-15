import { For } from "solid-js";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export default function MonthMobileTableHead() {
  return (
    <tr class="flex items-center justify-around border-b border-b-gray-200 pb-2 mb-3">
      <For each={weekDays}>
        {(name) => <td class="w-5 h-5 text-center">{name}</td>}
      </For>
    </tr>
  );
}
