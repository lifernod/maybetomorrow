import {children, JSXElement, Suspense} from "solid-js";
import Loading from "./loading";

type LazyViewProps = {
    children: JSXElement;
}

export default function LazyView(props: LazyViewProps) {
    const safeChildren = children(() => props.children);
    return (
        <Suspense fallback={<Loading />}>
            {safeChildren()}
        </Suspense>
    )
}