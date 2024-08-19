import * as React from 'react';

import { Button } from '@/components/ui/button';
import { z } from 'zod';
import NiceModal from '@ebay/nice-modal-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/pages/entry/create-project-form.zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProject } from '@/pages/entry/api';

interface CreateTeamFormProps {
  onOk: () => void;
}

const CreateTeamForm = NiceModal.create<CreateTeamFormProps>(({ onOk }) => {
  const modal = NiceModal.useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      desc: '',
    },
  });
  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    createProject(value).then(async ({ success }) => {
      if (!success) {
        throw new Error('fail on use server function');
      }
      onOk();
      modal.remove();
    });
  };
  return (
    <Dialog
      open={modal.visible}
      onOpenChange={() => {
        modal.remove();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>create team</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'desc'}
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
            <div className="flex justify-end">
              <Button type="submit">create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

NiceModal.register('create-team-form', CreateTeamForm);

export default CreateTeamForm;
