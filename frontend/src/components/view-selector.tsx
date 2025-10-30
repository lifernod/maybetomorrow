import {ViewMode, viewModes} from "../lib/view";
import {Index, Setter} from "solid-js";

type ViewSelectorProps = {
    viewMode: ViewMode;
    setViewMode: Setter<ViewMode>;
};

export default function ViewSelector(props: ViewSelectorProps) {

    const handleClick = (viewMode: ViewMode) => {
        props.setViewMode(viewMode);
    }

    return (
        <div class={"mx-auto w-1/3 h-12 flex items-center justify-around bg-table-undefined"}>
            <Index each={viewModes}>
                {
                    (mode) => (
                        <button
                            classList={{
                                "border-r-2 cursor-pointer text-lg font-medium border-r-table-border last-of-type:border-r-0 w-full h-full": true,
                                "border-b-2 border-b-primary font-semibold": props.viewMode == mode()
                            }}
                            onClick={[handleClick, mode()]}
                        >{mode().valueOf()}</button>
                    )
                }
            </Index>
        </div>
    )
}