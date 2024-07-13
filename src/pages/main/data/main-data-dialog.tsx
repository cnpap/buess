import NiceModal from '@ebay/nice-modal-react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MainDataDialog = NiceModal.create(() => {
  const modal = NiceModal.useModal();
  return (
    <Dialog
      open={modal.visible}
      onOpenChange={() => {
        modal.remove();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>data</DialogTitle>
          <DialogDescription>
            <div>data</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
});

NiceModal.register('main-data', MainDataDialog);

export default MainDataDialog;
