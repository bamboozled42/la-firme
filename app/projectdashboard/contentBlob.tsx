"use client"
import { useState } from "react";

function ContentBlob({ content }: { content: any[] }) {
  /* TODO (perdogarcia): Fix display to handle individual state of
  each item, rather than all items as one state so toggling one doesn't
  untoggle another
  */
  const [display, setDisplay] = useState<number | null>(null);
  const toggleItem = (index: number) => {
    setDisplay(display === index ? null : index);
  };

  return (
    <div>
      {content?.map((item: any, index: number) => (
        <div key={index}>
          <div onClick={() => toggleItem(index)} style={{ cursor: "pointer" }}>
            <h1>{item.name}</h1>
          </div>
          {display === index && (
            <div>
              {Object.keys(item).map((key) => (
                <p key={key}>
                  <strong>{key}: </strong> {item[key]}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContentBlob;
