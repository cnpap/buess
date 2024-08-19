/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { z } from 'zod';
import NiceModal from '@ebay/nice-modal-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import formSchema from '@/pages/main/config/form/create-config-form.zod';
import { ConfigType } from '@/pages/main/config/type';
import { createConfig } from '@/pages/main/config/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

interface CreateConfigFormProps {
  projectId: string;
  onOk: () => void;
}

const CreateConfigForm = NiceModal.create<CreateConfigFormProps>(({ onOk, projectId }) => {
  const modal = NiceModal.useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: ConfigType.YAML,
      data: '',
      project_id: projectId,
    },
  });
  const [type, setType] = useState<ConfigType>(ConfigType.YAML);
  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    createConfig(value).then(async ({ success }) => {
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
          <DialogTitle>create config</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            aria-autocomplete={'none'}
            onSubmit={form.handleSubmit(handleSubmit)}
            className={'space-y-2'}
          >
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input aria-autocomplete={'none'} placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'type'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(v) => {
                      setType(v as ConfigType);
                      field.onChange(v);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(ConfigType).map(([key, value]) => {
                        return (
                          <SelectItem key={key} value={value}>
                            {key}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'data'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    {[ConfigType.YAML, ConfigType.JSON].includes(type) ? (
                      <Editor
                        className={'border rounded-md p-2'}
                        options={{
                          tabSize: 2,
                        }}
                        height={400}
                        language={type}
                        value={field.value}
                        onChange={(v) => {
                          field.onChange(v);
                        }}
                      />
                    ) : (
                      <Input aria-autocomplete={'none'} placeholder="data" {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-2">
              <Button type="submit">create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

NiceModal.register('create-config-form', CreateConfigForm);

export default CreateConfigForm;
