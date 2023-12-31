import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
export default function Home() {
  return (
    <div className="flex-1 mt-10 mx-10">
      <button className={buttonVariants({ variant: "ghost" })} >Click here</button>
      <button className={buttonVariants({ variant: "secondary" })}>Click here</button>
      <button className={buttonVariants({ variant: "default" })}>Click here</button>
    </div>
  )
}
