// export const createAuthSlice = (set) => ({
//   // Load userInfo from localStorage (if it exists)
//   userInfo: (() => {
//     const storedUserInfo = localStorage.getItem('userInfo');
    
//     // Check if the value is "undefined" string and return {} if so
//     if (storedUserInfo === "undefined") {
//       return {};
//     }
    
//     // Otherwise, parse the JSON value safely
//     return storedUserInfo ? JSON.parse(storedUserInfo) : {};  
//   })(),

//   // Function to update userInfo and persist it in localStorage
//   setUserInfo: (updatedInfo) => {
//     // Retrieve the current userInfo from the state (if exists)
//     set((state) => {
//       const currentUserInfo = state.userInfo;

//       // Merge the updated profilePic with the existing userInfo
//       const newUserInfo = { ...currentUserInfo, ...updatedInfo };

//       // Persist the updated userInfo in localStorage
//       localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      
//       return { userInfo: newUserInfo }; // Set the updated userInfo in the state
//     });
//   },

//   logout: () => {
//     localStorage.removeItem("userInfo");
//     set({ userInfo: null });
//   },
// });

export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});