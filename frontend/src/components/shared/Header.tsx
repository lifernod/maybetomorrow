import { For } from "solid-js";
import { View, views } from "App";

type HeaderProps = {
  view: View;
  onChangeView: (newView: View) => void;
};

export default function Header(props: HeaderProps) {
  return (
    <header class="flex flex-col items-center my-5">
      <section class="flex">
        <For each={Object.values(views)}>
          {(view) => (
            <button
              classList={{
                "header-link text-primary": props.view === view,
                "header-link": props.view !== view,
              }}
              onClick={[props.onChangeView, view]}
            >
              {view.name}
            </button>
          )}
        </For>
      </section>
    </header>
  );
}
