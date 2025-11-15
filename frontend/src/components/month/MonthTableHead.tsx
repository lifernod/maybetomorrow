import { For } from "solid-js";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export default function MonthTableHead() {
  return (
    <tr>
      <For each={weekDays}>
        {(name) => (
          <td class="w-10 h-10 bg-table-border border-2 border-table-border text-center font-medium">
            {name}
          </td>
        )}
      </For>
    </tr>
  );
}
