import { useAppContext } from "components/StateProvider";

export const useAdd = () => {
  const { actions } = useAppContext();

  return async text => {
    await actions.add(text);
  };
};

export const useRemove = () => {
  const { actions } = useAppContext();

  return async item => {
    await actions.remove(item);
  };
};
