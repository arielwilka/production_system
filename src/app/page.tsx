import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
export default function Home() {
  return (
    <><div className='flex flex-row ml-10 my-5' >
      <h1 className='font-bold'>Dashboard</h1>
    </div>
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <button className={buttonVariants({ variant: "ghost" })}>Click here</button>
        <button className={buttonVariants({ variant: "secondary" })}>Click here</button>
        <button className={buttonVariants({ variant: "default" })}>Click here</button>
      </section></>
  )
}
