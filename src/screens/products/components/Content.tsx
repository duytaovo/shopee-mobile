import React from "react";
import { ProductIProps } from "../../../types/product";

interface Props {
  data: ProductIProps;
}
const Content: React.FC<Props> = ({ data }) => {
  return <div>Content</div>;
};

export default Content;
