import MonthMobileTableBody from "./MonthMobileTableBody";
import MonthMobileTableHead from "./MonthMobileTableHead";

export default function MonthMobileTable() {
  return (
    <table class="mx-4 flex flex-col">
      <MonthMobileTableHead />
      <MonthMobileTableBody />
    </table>
  );
}
