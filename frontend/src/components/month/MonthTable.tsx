import MonthTableBody from "./MonthTableBody";
import MonthTableHead from "./MonthTableHead";

export default function MonthTable() {
  return (
    <table class="w-1/2">
      <MonthTableHead />
      <MonthTableBody />
    </table>
  );
}
