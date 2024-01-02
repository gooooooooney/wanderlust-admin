import { Cell } from "../types";
import Image from "next/image";
import 'photoswipe/dist/photoswipe.css'


import { Gallery, Item } from 'react-photoswipe-gallery'


export const ImageCell: Cell = ({ getValue, row }) => (


  <Gallery>
    <Item
      original={getValue() as string}
      thumbnail={getValue() as string}
      width="1024"
      height="768"
    >
      {({ ref, open }) => (
        <Image
          ref={ref}
          className="aspect-square object-cover rounded-md cursor-pointer"
          src={getValue() as string}
          alt={row.getValue("description")}
          width={50}
          height={50}
          onClick={open}
        />
      )}
    </Item>
  </Gallery>


);