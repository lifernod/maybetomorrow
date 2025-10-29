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
        <div>
            <Index each={viewModes}>
                {
                    (mode) => (
                        <button onClick={[handleClick, mode()]}>{mode().valueOf()}</button>
                    )
                }
            </Index>
        </div>
    )
}