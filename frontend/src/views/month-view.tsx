import {createResource, createSignal, Match, Suspense, Switch} from "solid-js";
import {Day, getExampleMonth, DayType} from "../lib/types";
import Loading from "../components/loading";
import Calendar from "../components/calendar/calendar";
import WeekDays from "../components/calendar/weekdays";
import {getMonthName} from "../lib/utils/names";
import DayTypesAnnotation from "../components/calendar/day-types-annotation";

export default function MonthView() {
    const [month, { mutate }] = createResource(getExampleMonth);

    const changeDay = (newDay: Day) => {
        mutate(prev => {
            if (!prev) return prev;

            const days = prev.days.map(week =>
                week.map(day => {
                    if (day.day_id == newDay.day_id) return { ...newDay, day_id: day.day_id };
                    else return day;
                })
            );

            return { ...prev, days };
        })
    }

    return (
        <>
            <div class={"flex flex-col items-center justify-center mt-8"}>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Match when={month.error}>
                            <h1>Failed to load month: {month.error}</h1>
                        </Match>
                        <Match when={month()}>
                            {
                                (loadedMonth) => (
                                    <>
                                        <h1 class={"font-montserrat font-semibold text-xl mb-5"}>
                                            {getMonthName(loadedMonth().month_number)}, {loadedMonth().month_year} г.
                                        </h1>

                                        <DayTypesAnnotation />

                                        <table class={"relative"}>
                                            <thead>
                                                <tr>
                                                    <WeekDays/>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <Calendar
                                                    days={loadedMonth().days}
                                                    changeDay={changeDay}
                                                />
                                            </tbody>
                                        </table>
                                    </>
                                )
                            }
                        </Match>
                    </Switch>
                </Suspense>
            </div>
        </>
    )
}