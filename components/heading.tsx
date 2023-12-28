import { Description, H3 } from "./typography/text"
import { Separator } from "./ui/separator"

type HeadingProps = {
  title: string
  description: string
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <H3>{title}</H3>
        <Description >
          {description}
        </Description>
      </div>
      <Separator orientation="horizontal" className="my-4" /></>
  )
}