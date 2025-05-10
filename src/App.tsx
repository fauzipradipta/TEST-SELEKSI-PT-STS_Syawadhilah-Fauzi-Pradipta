import { Content, Footer, Header, Sidebar } from "./components";
import {
  addWindowClass,
  calculateWindowSize, // Assuming this is expensive
  removeWindowClass,
  useWindowSize,
  useDispatch,
  useEffect,
  LoadingContent,
} from "./utils";
import {
  AppDispatch,
  themesActions,
  useAppSelector,
  utilityActions,
} from "./reduxStore";
import React, { useMemo } from "react";
import RegisterPage from "./pages/register/RegisterPage";

// const App = () => {
//   const theme = useAppSelector((state) => state.theme);
//   const utility = useAppSelector((state) => state.utility);

//   const dispatch = useDispatch<AppDispatch>();
//   const windowSize = useWindowSize();

//   const memoizedWindowSize = useMemo(
//     () => calculateWindowSize(windowSize.width),
//     [windowSize.width]
//   );

//   const handleToggleMenuSidebar = () => {
//     dispatch(themesActions.setSidebarToggle(!theme.getSidebarToggle));
//   };

//   useEffect(() => {
//     removeWindowClass("sidebar-closed");
//     removeWindowClass("sidebar-collapse");
//     removeWindowClass("sidebar-open");

//     // Use the memoized window size
//     const size = memoizedWindowSize;

//     if (utility.getScreenSize !== size) {
//       dispatch(utilityActions.setScreenSize(size));
//     }

//     if (theme.getSidebarToggle && utility.getScreenSize === "lg") {
//       addWindowClass("sidebar-collapse");
//     } else if (theme.getSidebarToggle && utility.getScreenSize === "xs") {
//       addWindowClass("sidebar-open");
//     } else if (!theme.getSidebarToggle && utility.getScreenSize !== "lg") {
//       addWindowClass("sidebar-closed");
//       addWindowClass("sidebar-collapse");
//     }
//   }, [
//     dispatch,
//     memoizedWindowSize,
//     theme.getSidebarToggle,
//     utility.getScreenSize,
//   ]);

//   return (
//     <React.Fragment>
//       <div >
//        {utility.getIsLogin ? (
//         <>
//             {theme.handleSetPageHeader && <Header />}
//             {theme.handleSetPageSidebar && <Sidebar />}
//             <Content />
//             {theme.handleSetFooter && <Footer />}
//           </>
//         ) : (
//           <Content />
//         )} 

//         <RegisterPage/>

//       </div>

//       <div
//         id="sidebar-overlay"
//         role="presentation"
//         onClick={() => handleToggleMenuSidebar()}
//       />
//       <LoadingContent loading={utility.getLoading.screen} />
//     </React.Fragment>
//   );
// };

const App = () => {

  return(
    <React.Fragment>
      <div>
        <RegisterPage />
      </div>
      <div
        id="sidebar-overlay"
        role="presentation"
      />
      {/* <LoadingContent loading={false} /> */}
    </React.Fragment>
  )
}

export default App;
