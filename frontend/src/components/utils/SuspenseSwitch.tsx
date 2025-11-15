import Error from "$components/shared/Error";
import Loading from "$components/shared/Loading";
import {
  Accessor,
  ErrorBoundary,
  JSXElement,
  Match,
  Resource,
  Suspense,
  Switch,
} from "solid-js";

type SuspenseSwitchProps<T> = {
  children: (resource: Accessor<T>) => JSXElement;
  resource: Resource<T>;
};

export default function SuspenseSwitch<T>(props: SuspenseSwitchProps<T>) {
  return (
    <ErrorBoundary fallback={Error}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Match when={props.resource()}>
            {(loadedResource) => props.children(loadedResource)}
          </Match>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}
