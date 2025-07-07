"use client";

import React, { startTransition } from "react";

export default function TransitionLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const { onClick, href, ...rest } = props;
  return (
    <a
      {...rest}
      href={href}
      // onClick={(e) => {
      //   e.preventDefault();
      //   startTransition(() => {
      //     if (onClick) {
      //       onClick(e);
      //     } else if (href) {
      //       window.location.href = href;
      //     }
      //   });
      // }}
    />
  );
}
