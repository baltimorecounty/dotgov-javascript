import React from "react";
import Accordion from "./Accordion";

const menus = [
  {
    id: 1,
    menuName: "Baltimore County Marks Progress in Rehabilitation",
    content: "Today Baltimore County officials joined with community and..."
  },
  {
    id: 2,

    menuName:
      "Baltimore County Marks Progress in Rehabilitation of Winters lane Homes",
    content: "Today Baltimore County officials joined with community and..."
  },
  {
    id: 3,
    menuName:
      "Baltimore County Marks Progress in Rehabilitation of Winters lane Homes",
    content: "Today..."
  },
  {
    id: 4,
    menuName:
      "Baltimore County Marks Progress in Rehabilitation of Winters lane Homes",
    content: "Today Baltimore County officials joined with community and..."
  }
];

const AccordionGroup = () => <Accordion menuItems={menus} />;

export default AccordionGroup;
