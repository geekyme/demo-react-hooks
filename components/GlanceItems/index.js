import { useAppContext } from "components/StateProvider";

export default function GlanceItems() {
  const { state } = useAppContext();

  return <div>Total items: {state.agenda.items.length}</div>;
}
