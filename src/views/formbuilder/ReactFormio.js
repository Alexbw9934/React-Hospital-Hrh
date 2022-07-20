
import React from "react";
import { FormBuilder, Components } from "react-formio";
import "../formbuilder/Custom/styles.css";
import components from "../formbuilder/Custom";

Components.setComponents(components);
export default function ReactFormio() {
  return (
    <div className="ReactFormio">
    <FormBuilder
        form={{ display: "form" }}
        onChange={schema => console.log(schema)}
        options={{
          builder: {
            basic: {
              components: {
                toggleCustomComp: true
              }
            },
            advanced: false
          }
        }}
        // onChange={schema => console.log(JSON.stringify(schema))}
      />
    </div>
  )
}

