export const reducer = (currentAction: any, currentState: any) => {

    const {action, payload } = currentAction;

    switch (action) {
        case 'navigate':
            currentState.screen = payload;
            break;

            case 'getpost':
                currentState.post = payload;
                break;
    }
    return currentState;
};