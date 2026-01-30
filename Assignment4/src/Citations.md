# App Drawer
https://mui.com/material-ui/react-app-bar/

Prop Drilling gets very convoluted
Passing props to prop
Instead implement useContext to avoid passing throught each component

// export const UserContext = createContext();

// When using useContext, wrap each child with
// <UserContext.Provider value=(user)>
//  <ComponentB user = {user}/>
// </UserContext.Provider>