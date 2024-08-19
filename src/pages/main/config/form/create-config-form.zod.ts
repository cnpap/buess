import { z } from 'zod';

const formSchema = z.object({
  type: z.string().max(20, { message: '类型的长度不能超过20个字符' }),
  data: z.string(),
  project_id: z.string().uuid({ message: '项目ID必须是有效的UUID' }),
  name: z
    .string()
    .max(40, { message: '名称的长度不能超过40个字符' })
    .min(2, { message: '名称不能为空' }),
});

export default formSchema;
