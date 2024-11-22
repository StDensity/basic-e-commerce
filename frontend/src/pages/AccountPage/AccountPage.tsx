import { Button } from "@/components/ui/button";
import { adminAuthFailure, User } from "@/types/apiTypes";
import { deleteUser, getAllUsers, isAuthenticated } from "@/utils/auth";
import { clearTokenInSession, setTokenInSession } from "@/utils/storage";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderUsers from "./RenderUsers";
import NavBar from "@/components/NavBar";
import AddProducts from "./AddProducts";

const AccountPage = () => {
   const navigate = useNavigate();
   const [userData, setUserData] = useState<
      User[] | undefined | adminAuthFailure
   >();
   const [isAdmin, setIsAdmin] = useState<boolean>(false);

   useLayoutEffect(() => {
      const checkAuth = async () => {
         const authenticated = await isAuthenticated();
         if (!authenticated) {
            navigate("/login");
         }
      };
      checkAuth();
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getAllUsers();
         setUserData(data);
         // @ts-ignore
         if (data.allowAccess === false) {
            return setIsAdmin(false);
         }
         setIsAdmin(true);
      };

      fetchData();
   }, []);

   const handleLogoutButton = () => {
      clearTokenInSession();
      navigate("/login");
   };

   const handleDeleteButton = () => {
      deleteUser();
      clearTokenInSession();
      navigate("/login");
   };

   useEffect(() => {
      if (userData) {
         console.log("Fetched userData:", userData);
      }
   }, [userData]);

   return (
      <div>
         <NavBar />
         <div className="flex gap-5">
            <div>
               <Button
                  onClick={() => handleLogoutButton()}
                  variant={"destructive"}
               >
                  Logout
               </Button>
            </div>
            <div>
               <Button onClick={() => handleDeleteButton()} variant={"outline"}>
                  Delete Account
               </Button>
            </div>
         </div>
         {isAdmin && (
            <div>
               <div className="bg-gray-200 rounded-lg p-5 mt-5">
                  {/* @ts-ignore */}
                  <RenderUsers users={userData} />
               </div>
               <div className="bg-gray-200 rounded-lg p-5 mt-5">
                  <AddProducts />
               </div>
            </div>
         )}
      </div>
   );
};

export default AccountPage;
