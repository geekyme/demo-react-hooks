import { useAppState } from "components/StateProvider";

export const init = async () => {
  const data = await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        agenda: {
          items: [
            {
              text: "hello"
            }
          ]
        }
      });
    }, 300);
  });

  return data;
};
export const useAdd = () => {
  const [state, setState] = useAppState();

  return async text => {
    const items = state.agenda.items.slice();

    items.push({
      text
    });

    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const roll = Math.random();

        if (roll < 0.5) {
          resolve({
            ...state,
            agenda: {
              items
            }
          });
        } else {
          reject(new Error("Failed to add item"));
        }
      }, 100);
    });

    return setState(data);
  };
};

export const useRemove = () => {
  const [state, setState] = useAppState();

  return async item => {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const roll = Math.random();

        if (roll < 0.5) {
          const items = state.agenda.items.filter(i => {
            return i !== item;
          });

          resolve({
            ...state,
            agenda: {
              items
            }
          });
        } else {
          reject(new Error("Failed to delete item"));
        }
      }, 100);
    });

    return setState(data);
  };
};
