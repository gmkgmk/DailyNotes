const { createStore, combineReducers } = Redux;

// -------- STATE (hue-box/state.js) -----------

const initialState = {
  hue: 10
};

// -------- ACTION CREATORS (hue-box/actions.js) -----------

const fakeUUID = () => Math.floor(Math.random() * 10000000);

const makeNamespacedBox = (namespace = fakeUUID()) => {
  const actions = {
    onUpdateHue: hue => {
      return { type: "UPDATE_HUE", hue, namespace };
    },

    onResetHue: () => {
      return { type: "RESET_HUE", namespace };
    }
  };

  const reducer = (state = {}, action) => {
    if (action.namespace !== namespace) {
      return state;
    }

    switch (action.type) {
      case "UPDATE_HUE":
        return Object.assign({}, state, { hue: action.hue + 30 });
      case "RESET_HUE":
        return Object.assign({}, state, { hue: 10 });
      default:
        return state;
    }
  };

  const Component = ({ state, dispatch }) => {
    return (
      <HueBoxDisplay
        state={state}
        updateHue={currentHue => dispatch(actions.onUpdateHue(currentHue))}
        resetHue={() => dispatch(actions.onResetHue())}
      />
    );
  };

  return { Component, actions, namespace, reducer };
};

// -------- COMPONENT AND WRAPPER (hue-box/box.js) -----------

const HueBoxDisplay = ({ state, updateHue, resetHue }) => {
  return (
    <div
      onMouseEnter={updateHue.bind(null, state.hue)}
      onClick={resetHue}
      style={{
        display: "inline-block",
        width: "300px",
        height: "300px",
        backgroundColor: `hsla(  ${state.hue}, 100%, 50%, 1)`,
        margin: "20px"
      }}
    />
  );
};

// -------- INITIALIZE MULTIPLE (bigger-app-section/index.js) -----------

const elem = document.getElementById("root");

const combinedStates = {
  // spread to make separate copies of the state
  boxOne: Object.assign({}, initialState),
  boxTwo: Object.assign({}, initialState)
};

const { Component: BoxOne, reducer: reducerOne } = makeNamespacedBox("ONE");

const { Component: BoxTwo, reducer: reducerTwo } = makeNamespacedBox("TWO");

const combinedReducers = combineReducers({
  boxOne: reducerOne,
  boxTwo: reducerTwo
});

const store = createStore(combinedReducers, combinedStates);

const Main = ({ state, dispatch }) => {
  return (
    <div>
      <BoxOne state={state.boxOne} dispatch={dispatch} />
      <BoxTwo state={state.boxTwo} dispatch={dispatch} />
    </div>
  );
};

const render = () => {
  ReactDOM.render(
    <Main state={store.getState()} dispatch={store.dispatch} />,
    elem
  );
};

render();
store.subscribe(render);
