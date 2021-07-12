import React from 'react'




const logoutBtn = () => {
     Alert.alert(
       "Logout",
       "Are you sure? You want to logout?",
       [
         {
           text: "Cancel",
           onPress: () => {
             return null;
           },
         },
         {
           text: "Confirm",
           onPress: () => {
             auth()
               .signOut()
               .then(() => navigation.replace("Auth"))
               .catch((error) => {
                 console.log(error);
                 if (error.code === "auth/no-current-user")
                   navigation.replace("Auth");
                 else alert(error);
               });
           },
         },
       ],
       { cancelable: false }
     );
   };

   export default logoutBtn;