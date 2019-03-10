import { useAppState } from "components/StateProvider";

export default function GlanceItems() {
  const [appState] = useAppState();

  return <div>Total items: {appState.agenda.items.length}</div>;
}
