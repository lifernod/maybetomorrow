type ErrorProps = {
  error: any;
  reset: () => void;
};

export default function Error(props: ErrorProps) {
  return <h1>Error: {props.error}</h1>;
}
