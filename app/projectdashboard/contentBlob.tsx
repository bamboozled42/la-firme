// "use client"
// import { useState } from "react";

// function ContentBlob({ content }: { content: any[] }) {
//   /* TODO (perdogarcia): Fix display to handle individual state of
//   each item, rather than all items as one state so toggling one doesn't
//   untoggle another
//   */
//   const [display, setDisplay] = useState<number | null>(null);
//   const toggleItem = (index: number) => {
//     setDisplay(display === index ? null : index);
//   };

//   const itemDisplay = (item: any) => {
//     const filteredKeys = Object.keys(item).filter((key) => key !== "name");
//     return filteredKeys.map((key) => (
//       <div key={key}>
//         <h3 style={{ marginRight: "8px" }}>{key}:</h3>
//         <p>{item[key]}</p>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       {content?.map((item: any, index: number) => (
//         <div key={index}>
//           <div onClick={() => toggleItem(index)}>
//             <h1>{item.name}</h1>
//           </div>
//           {display === index && (
//             <div>
//               {itemDisplay(item)}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ContentBlob;
