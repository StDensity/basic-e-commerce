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
import { Button } from "@/components/ui/button";
import { isAuthenticated, login } from "@/utils/auth";
import {  useLayoutEffect, useState } from "react";
import { setTokenInSession } from "@/utils/storage";

const LoginPage = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [showMessage, setShowMessage] = useState<boolean>(false);

   useLayoutEffect(() => {
      const checkAuth = async () => {
         if (await isAuthenticated()) {
            navigate("/");
         }
      };
      checkAuth();
   }, []);

   const handleLoginButton = async () => {
      const response = await login(username, password);
      console.log(response);
      if (response?.successStatus && response.token) {
         setTokenInSession(response?.token);
         setShowMessage(false);
         navigate("/");
      } else {
         setShowMessage(true);
      }
   };
   return (
      <div className="flex justify-center  min-h-screen">
         <div>
            <Card>
               <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Please login to continue</CardDescription>
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
                  <Button onClick={() => handleLoginButton()}>Login</Button>
                  <Button variant={"outline"} onClick={() => navigate("/signup")}>or Signup</Button>
               </CardFooter>
               {showMessage && (
                  <div className="text-red-500 text-center mb-5">
                     Couldn't log you in
                  </div>
               )}
            </Card>
         </div>
      </div>
   );
};

export default LoginPage;
