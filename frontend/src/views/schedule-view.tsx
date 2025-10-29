import {createSignal, lazy, Match, Switch} from "solid-js";
import {ViewMode, viewModes} from "../lib/view";
import MonthView from "./month-view";
import LazyView from "../components/lazy-view";
import ViewSelector from "../components/view-selector";

const DayView = lazy(() => import("./day-view"));
const WeekView = lazy(() => import("./week-view"));


export default function ScheduleView() {
    const [viewMode, setViewMode] = createSignal<ViewMode>(ViewMode.Month);

    return (
        <section>
            <ViewSelector viewMode={viewMode()} setViewMode={setViewMode} />

            <Switch>
                {/*Default view*/}
                <Match when={viewMode() == ViewMode.Month}>
                    <MonthView />
                </Match>

                <Match when={viewMode() == ViewMode.Week}>
                    <LazyView>
                        <WeekView />
                    </LazyView>
                </Match>

                <Match when={viewMode() == ViewMode.Day}>
                    <LazyView>
                        <DayView />
                    </LazyView>
                </Match>

            </Switch>
        </section>
    )
}