import MonthMobileHeader from "$components/month/mobile/MonthMobileHeader";
import MonthMobileTable from "$components/month/mobile/MonthMobileTable";
import MonthHeader from "$components/month/MonthHeader";
import SuspenseSwitch from "$components/utils/SuspenseSwitch";
import { CurrentMonthProvider } from "$lib/context/CurrentMonthContext";
import { Month } from "$lib/types/month";
import { createResource } from "solid-js";

export default function MobileMonthView() {
  const [month, { refetch }] = createResource(Month.getCurrentMonth);

  return (
    <section>
      <SuspenseSwitch resource={month}>
        {(loadedMonth) => (
          <section class="flex flex-col items-center mt-8">
            <CurrentMonthProvider month={loadedMonth()}>
              <MonthMobileHeader />
              <MonthMobileTable />
            </CurrentMonthProvider>
          </section>
        )}
      </SuspenseSwitch>
    </section>
  );
}
