import { columns } from '@/components/ui/components/columns';
import { DataTable } from '@/components/ui/components/data-table';
import tasks from './data/tasks.json';

export default function TaskPage() {
  return (
    <div className="flex-1 flex-col p-8 md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
