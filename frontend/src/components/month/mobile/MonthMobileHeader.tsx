import { useCurrentMonth } from "$lib/context/CurrentMonthContext";
import { For } from "solid-js";

const dayTypes = [
  { name: "Не назначено", bgCls: "bg-table-undefined" },
  { name: "Другой месяц", bgCls: "bg-table-uneditable" },
  { name: "Свободен", bgCls: "bg-table-free" },
  { name: "Занят", bgCls: "bg-table-busy" },
] as const;

export default function MonthMobileHeader() {
  const { monthInfo } = useCurrentMonth();

  return (
    <div class="flex flex-col items-center">
      <h1 class="font-alternates font-medium text-lg mb-5">
        {monthInfo().monthName.long} {monthInfo().year}
      </h1>
    </div>
  );
}
