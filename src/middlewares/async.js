// middleware function 
export default function({ dispatch}) {
    return next => action => {
        
        if(!action.payload || !action.payload.then) {
            return next(action); // send action on to the next middleware stack 
                      // If we don't have any other middleware, it's going to be forwared onto our reducers
        }

        // Make sure the action's promise resolves
        action.payload.then(response => {
            // create a new Action with the old type, but
            // replace the promise with the response data
            const newAction = {...action, payload: response};
            dispatch(newAction); // new Action을 top middleware부터 다시 시작
        });
        //console.log('We have a promise', action);
    }
}