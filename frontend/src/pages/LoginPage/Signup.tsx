import { Input } from "@/components/ui/input";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createUser, isAuthenticated } from "@/utils/auth";
import { setTokenInSession } from "@/utils/storage";

const Signup = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   useLayoutEffect(() => {
      const checkAuth = async () => {
         if (await isAuthenticated()) {
            navigate("/");
         }
      };
      checkAuth();
   }, []);

   const handleSigninButton = async () => {
      const res = await createUser(username, password);
      if (res) {
         setTokenInSession(res?.token);
         navigate("/");
      }
   };
   return (
      <div>
         <div className="flex justify-center  min-h-screen">
            <div>
               <Card>
                  <CardHeader>
                     <CardTitle>Signup</CardTitle>
                     <CardDescription>
                        Please create an account to continue
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="mb-4"
                     />
                     <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                     />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                     <Button
                        variant={"outline"}
                        onClick={() => navigate("/login")}
                     >
                        or Login
                     </Button>
                     <Button onClick={() => handleSigninButton()}>
                        Signup
                     </Button>
                  </CardFooter>
                  {/* {showMessage && (
                     <div className="text-red-500 text-center mb-5">
                        Couldn't log you in
                     </div>
                  )} */}
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Signup;
function setShowMessage(arg0: boolean) {
   throw new Error("Function not implemented.");
}
