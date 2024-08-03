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
import { Input } from '@/components/ui/input';

interface ConfirmProps {
  title: string;
  id: string;
  onOk: () => void;
}

const Confirm = NiceModal.create<ConfirmProps>(({ title, id, onOk }) => {
  const modal = NiceModal.useModal();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
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
          <div className="py-4">
            Please enter the name
            <div className={'text-red-500 inline'}> [ {id} ] </div>
            to confirm the deletion operation
          </div>
        </DialogHeader>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <p className={'text-sm text-muted-foreground text-red-500'}>{error}</p>
        <DialogFooter className={'gap-4'}>
          <Button
            variant={'destructive'}
            onClick={() => {
              if (value !== title) {
                setError('Name does not match');
                return;
              }
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
