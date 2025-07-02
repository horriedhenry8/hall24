import { useEffect } from "react";

function DocumentTitle({ data }) {
  useEffect(() => {
    document.title = data;
    console.log(data, "siuuuuuuu");
  }, [data]);
}
export default DocumentTitle;
