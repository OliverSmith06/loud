import Link from "next/link";
import HoverShinyEffect from "../HoverShinyEffect/HoverShinyEffect";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  id?: string;
  type?: string;
  external?: boolean;
};

function LinkButton({
  children,
  href = "/",
  className,
  id,
  type = "primary",
  external = false,
}: Props) {
  if (external) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noreferrer"
        // className={classNames(styles.button, className, styles[type])}
      >
        {children}
        <HoverShinyEffect />
      </a>
    );
  }
  return (
    <Link href={href}>
      {/* <a id={id} 
      className={classNames(styles.button, className, styles[type])}
      > */}
      {children}
      <HoverShinyEffect />
      {/* </a> */}
    </Link>
  );
}

export default LinkButton;
