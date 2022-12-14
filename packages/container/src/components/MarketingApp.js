import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";
export default () => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        // console.log("navigation in marketing app occur");
        const { pathname: currentPathName } = history.location;
        if (currentPathName !== nextPathName) {
          history.push(nextPathName);
        }
      },
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};
