import { Dynamic } from "solid-js/web";
import { useViewManager } from "$lib/context/ViewContext";

export default function AppView() {
  const { currentView } = useViewManager();

  return <Dynamic component={currentView().component} />;
}
