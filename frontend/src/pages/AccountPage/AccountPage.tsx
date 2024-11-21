import { Button } from "@/components/ui/button";
import { clearTokenInSession, setTokenInSession } from "@/utils/storage";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
   const navigate = useNavigate();
   const handleLogoutButton = () => {
      clearTokenInSession();
      navigate("/login");
   };

   // TODO Implement add user list view for admin.
   // TODO Add product option for admin

   return (
      <div>
         <Button onClick={() => handleLogoutButton()} variant={"destructive"}>
            Logout
         </Button>
      </div>
   );
};

export default AccountPage;
