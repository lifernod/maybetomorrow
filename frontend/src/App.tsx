import Header from "$components/shared/Header";
import Footer from "$components/shared/Footer";
import {
  createEffect,
  createSignal,
  JSXElement,
  onCleanup,
  onMount,
} from "solid-js";

import MonthView from "$views/MonthView";
import WeekView from "$views/WeekView";
import DayView from "$views/DayView";
import { Dynamic } from "solid-js/web";
import MobileMonthView from "$views/MobileMonthView";

export type View = {
  name: string;
  view: () => JSXElement;
  mobile: () => JSXElement;
};

export const views: Record<string, View> = {
  // day: { name: "День", view: DayView },
  // week: { name: "Неделя", view: WeekView },
  month: { name: "Месяц", view: MonthView, mobile: MobileMonthView },
} as const;

export default function App() {
  const [viewportWidth, setViewportWidth] = createSignal(window.innerWidth);
  const [viewMode, setViewMode] = createSignal<"mobile" | "desktop">("desktop");
  const [view, setView] = createSignal<View>(views.month);

  createEffect(() => {
    if (viewportWidth() < 1024) {
      setViewMode("mobile");
    } else {
      setViewMode("desktop");
    }
  });

  const resizeHandler = () => {
    setViewportWidth(window.innerWidth);
  };

  onMount(() => {
    window.addEventListener("resize", resizeHandler);
  });
  onCleanup(() => {
    window.removeEventListener("resize", resizeHandler);
  });

  return (
    <>
      {/* <Header view={view()} onChangeView={onChangeView} /> */}
      <main>
        <Dynamic
          component={viewMode() == "desktop" ? view().view : view().mobile}
        />
      </main>

      <Footer />
    </>
  );
}
