import {createResource, createSignal, Match, Suspense, Switch} from "solid-js";
import {Day, getExampleMonth, DayType} from "../lib/types";
import Loading from "../components/loading";
import Calendar from "../components/calendar/calendar";
import WeekDays from "../components/calendar/weekdays";
import {getMonthName} from "../lib/utils/names";
import DayTypesAnnotation from "../components/calendar/day-types-annotation";

export default function MonthView() {
    const [month, { mutate }] = createResource(getExampleMonth);

    const changeDayType = (day_id: Day["day_id"]) => {

    }

    // function changeDayType(day_id: Day["day_id"]) {
    //     mutate(prev => {
    //         if (!prev) return prev;
    //
    //         // Создаем копию, чтобы не мутировать напрямую
    //         return prev.map(week =>
    //             week.map(day => {
    //                 if (day.day_id === day_id) {
    //                     // Циклическое переключение типа дня
    //                     let nextType;
    //                     switch (day.day_type) {
    //                         case DayType.Undefined:
    //                             nextType = DayType.Free;
    //                             break;
    //                         case DayType.Free:
    //                             nextType = DayType.Busy;
    //                             break;
    //                         case DayType.Busy:
    //                             nextType = DayType.Undefined;
    //                             break;
    //                         default:
    //                             nextType = day.day_type;
    //                     }
    //                     return { ...day, day_type: nextType };
    //                 }
    //                 return day;
    //             })
    //         );
    //     });
    // }
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

                                        <table>
                                            <thead>
                                                <tr>
                                                    <WeekDays/>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <Calendar
                                                    days={loadedMonth().days}
                                                    changeDayType={changeDayType}
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