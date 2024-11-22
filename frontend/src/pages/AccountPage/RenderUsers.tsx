import { User } from "@/types/apiTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RenderUsersProps {
   users: User[];
}

const RenderUsers = (props: RenderUsersProps) => {
   const getRandomNum = () => Math.floor(Math.random() * 70) + 1;
   const renderUsers = () => {
      return props.users.map((item, index) => (
         <div
            key={index}
            className={
               item.role == "admin"
                  ? "px-5 py-3 rounded-lg bg-gray-500 mt-2 flex flex-col items-center"
                  : "px-5 py-3 rounded-lg bg-gray-300 mt-2 flex flex-col items-center"
            }
         >
            <div className="text-gray-700 font-bold text-center mb-2">
               {item.username}
            </div>
            <div className="flex justify-center">
               <Avatar>
                  <AvatarImage
                     src={`https://i.pravatar.cc/150?img=${getRandomNum()}`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
            </div>
         </div>
      ));
   };

   return (
      <div>
         <div className="text-4xl font-bold text-gray-600 ">Users</div>
         <div className="flex flex-wrap gap-5">{renderUsers()}</div>
      </div>
   );
};

export default RenderUsers;
