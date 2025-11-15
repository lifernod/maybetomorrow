import Header from "$components/shared/Header";
import AppView from "$views/AppView";
import Footer from "$components/shared/Footer";
import { createSignal, JSXElement } from "solid-js";

import MonthView from "$views/MonthView";
import WeekView from "$views/WeekView";
import DayView from "$views/DayView";
import { Dynamic } from "solid-js/web";

export type View = {
  name: string;
  view: () => JSXElement;
};

export const views: Record<string, View> = {
  day: { name: "День", view: DayView },
  week: { name: "Неделя", view: WeekView },
  month: { name: "Месяц", view: MonthView },
} as const;

export default function App() {
  const [view, setView] = createSignal<View>(views.month);

  const onChangeView = (newView: View) => {
    setView(newView);
  };

  return (
    <>
      <Header view={view()} onChangeView={onChangeView} />

      <main>
        <Dynamic component={view().view} />;
      </main>

      <Footer />
    </>
  );
}
