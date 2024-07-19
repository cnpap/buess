import * as React from 'react';

import { Button } from '@/components/ui/button';
import { z } from 'zod';
import AutoForm from '@/components/ui/auto-form';
import { createOrganizationByUser } from '@/services/logto/src/organization';
import { formSchema } from '@/services/logto/src/organization.zod';

import NiceModal from '@ebay/nice-modal-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CreateOrganizationFormProps {
  onOk: () => void;
}

const CreateOrganizationForm = NiceModal.create<CreateOrganizationFormProps>(({ onOk }) => {
  const modal = NiceModal.useModal();
  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    createOrganizationByUser(value).then(async ({ success }) => {
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
          <DialogTitle>create organization</DialogTitle>
        </DialogHeader>
        <AutoForm<typeof formSchema>
          onSubmit={handleSubmit}
          formSchema={formSchema}
          fieldConfig={{
            description: {
              fieldType: 'textarea',
            },
          }}
        >
          <div className="flex justify-end">
            <Button>create</Button>
          </div>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
});

NiceModal.register('create-organization-form', CreateOrganizationForm);

export default CreateOrganizationForm;
