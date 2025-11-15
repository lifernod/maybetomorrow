import MonthHeader from "$components/month/MonthHeader";
import MonthTable from "$components/month/MonthTable";
import SuspenseSwitch from "$components/utils/SuspenseSwitch";
import { CurrentMonthProvider } from "$lib/context/CurrentMonthContext";
import { Month } from "$lib/types/month";
import { createResource } from "solid-js";

export default function MonthView() {
  const [month, { refetch }] = createResource(Month.getCurrentMonth);

  return (
    <section>
      <SuspenseSwitch resource={month}>
        {(loadedMonth) => (
          <section class="flex flex-col items-center mt-8">
            <CurrentMonthProvider month={loadedMonth()}>
              <MonthHeader />
              <MonthTable />
            </CurrentMonthProvider>
          </section>
        )}
      </SuspenseSwitch>
    </section>
  );
}
