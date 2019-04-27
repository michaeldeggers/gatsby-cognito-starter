class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem('cloud-factory:state');

      if (serializedState === null) {
        return StateLoader.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return StateLoader.initializeState();
    }
  }

  static saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem('cloud-factory:state', serializedState);
    } catch (err) {}
  }

  static initializeState() {
    return {
      loggedIn: false,
    };
  }
}

export default StateLoader;
