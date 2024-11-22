interface DisplayCartItemCountProps {
   count: number | undefined;
}

const DisplayCartItemCount = (props: DisplayCartItemCountProps) => {
   return (
      <div>
         <div>🛒 {props.count}</div>
      </div>
   );
};

export default DisplayCartItemCount;
