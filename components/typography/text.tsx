import { cn } from '@/lib/utils'
// import { Link } from './link'

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      data-slot="text"
      className={cn(className, 'text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400')}
    />
  )
}

// export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
//   return (
//     <Link
//       {...props}
//       className={cn(
//         className,
//         'text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white'
//       )}
//     />
//   )
// }

export function Description({ className, ...props }: React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <p className='text-sm text-muted-foreground' {...props} />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={cn(className, 'font-medium text-zinc-950 dark:text-white')} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={cn(
        className,
        'rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white'
      )}
    />
  )
}

export function H3({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3 {...props} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} />
  )
}
