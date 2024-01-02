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
import { addNewVirtualTour } from '@/actions/virtual-tour'
import { toast } from 'sonner'
import { useToggle } from 'usehooks-ts'



export function AddData() {
  const [isPending, startTransition] = useTransition();
  const [open, toggle, setOpen] = useToggle()
  const form = useForm<z.infer<typeof AddVirtualTourSchema>>({
    resolver: zodResolver(AddVirtualTourSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      link: "",
      coverSrc: "",
      order: "0",
    },
  });
  function onSubmit(values: z.infer<typeof AddVirtualTourSchema>) {
    startTransition(() => {
      addNewVirtualTour(values).then(() => {
        toast.success('Added new virtual tour')
        toggle()
      })
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add</Button>
      </DialogTrigger>
      <DialogContent className=" ml-auto">
        <DialogHeader>
          <DialogTitle>Add new Data</DialogTitle>
          <DialogDescription>
            Add new data to your virtual tour
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
              <Btn  disabled={isPending} type="submit">Add</Btn>
            </div>
          </form>
        </Form>
        {/* <DialogFooter>
          
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
