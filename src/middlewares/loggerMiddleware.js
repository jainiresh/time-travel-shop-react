const loggerMiddleware = store => next => action => {
    const prevState = store.getState();
    
    console.log('%cPrevious State:', 'color: red; font-weight: bold;', prevState);
    
    console.log('%cAction:', 'color: green; font-weight: bold;', action);
  
    const result = next(action);
  
    const nextState = store.getState();
    
    console.log('%cNext State:', 'color: orange; font-weight: bold;', nextState);
  
    return result;
  };
  
  export default loggerMiddleware;
  