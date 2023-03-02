import dynamic from "next/dynamic";
import React from "react";

const NoSsrWrapper = (props: { children: any }) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export const NoSSR = dynamic(() => Promise.resolve(NoSsrWrapper), {
  ssr: false,
});
