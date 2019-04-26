class StateLoader {
    loadState() {
        try {
            let serializedState = localStorage.getItem(
                'cloud-factory:state'
            );

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        } catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem('cloud-factory:state', serializedState);
        } catch (err) {}
    }

    initializeState() {
        return {
            loggedIn: false
        };
    }
}

export default StateLoader;
