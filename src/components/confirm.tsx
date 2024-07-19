import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmProps {
  title: string;
  content: string;
  onOk: () => void;
}

const Confirm = NiceModal.create<ConfirmProps>(({ title, content, onOk }) => {
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
          <DialogTitle>{title}</DialogTitle>
          <div className="p-4">{content}</div>
        </DialogHeader>
        <DialogFooter className={'gap-4'}>
          <Button
            variant={'destructive'}
            onClick={() => {
              onOk();
              modal.remove();
            }}
          >
            yes
          </Button>
          <Button onClick={modal.remove}>cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

NiceModal.register('confirm', Confirm);

export default Confirm;
