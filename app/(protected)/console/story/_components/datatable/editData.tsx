"use client"
import React, { useTransition } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddVirtualTourSchema } from '@/schemas'
import * as z from 'zod'
import { Btn } from '@/components/btn'
import { Switch } from '@radix-ui/react-switch'
import { addNewVirtualTour, updateVirtualTour } from '@/actions/virtual-tour'
import { toast } from 'sonner'
import { VirtualTour } from '@prisma/client'
import { UpdateIcon } from '@radix-ui/react-icons'
import { useToggle } from 'usehooks-ts'



export function EditData({ row }: { row: VirtualTour }) {
  const [isPending, startTransition] = useTransition();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [open, toggle, setOpen] = useToggle()
  const form = useForm<z.infer<typeof AddVirtualTourSchema>>({
    resolver: zodResolver(AddVirtualTourSchema),
    defaultValues: {
      title: row.title!,
      description: row.description!,
      author: row.author!,
      link: row.link!,
      coverSrc: row.coverSrc!,
      order: row.order.toString(),
    },
  });
  function onSubmit(values: z.infer<typeof AddVirtualTourSchema>) {
    startTransition(() => {
      updateVirtualTour(row.id, values).then(() => {
        toast.success('Updated virtual tour')
        toggle()
      })
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className='w-full px-2 justify-start'>
          <UpdateIcon className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent ref={dialogRef} className=" ml-auto">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
          <DialogDescription>
            Edit data to your virtual tour
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Gooney" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="1|2|3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverSrc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-right'>
              <Btn disabled={isPending} type="submit">Update</Btn>
            </div>
          </form>
        </Form>
        {/* <DialogFooter>
          
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
