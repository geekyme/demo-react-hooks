function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getActions(state, setState) {
  return {
    init: async () => {
      const data = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            agenda: {
              items: [
                {
                  text: "hello",
                  id: uuidv4()
                }
              ]
            }
          });
        }, 300);
      });

      return setState(data);
    },
    add: async text => {
      const items = state.agenda.items.slice();

      items.push({
        text,
        id: uuidv4()
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
    },
    remove: async item => {
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
    }
  };
}
