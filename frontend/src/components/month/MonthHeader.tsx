import { useCurrentMonth } from "$lib/context/CurrentMonthContext";
import { For } from "solid-js";

const dayTypes = [
  { name: "Не назначено", bgCls: "bg-table-undefined" },
  { name: "Другой месяц", bgCls: "bg-table-uneditable" },
  { name: "Свободен", bgCls: "bg-table-free" },
  { name: "Занят", bgCls: "bg-table-busy" },
] as const;

export default function MonthHeader() {
  const { monthInfo } = useCurrentMonth();

  return (
    <div class="flex flex-col items-center">
      <h1 class="font-alternates font-medium text-lg mb-5">
        {monthInfo().monthName.long} {monthInfo().year}
      </h1>
      <div class="flex mb-3 gap-8">
        <For each={dayTypes}>
          {/* @once */}
          {(type) => (
            <div class="flex items-center gap-2">
              <div class={`w-6 h-6 ${type.bgCls}`} />
              <h1>{type.name}</h1>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
