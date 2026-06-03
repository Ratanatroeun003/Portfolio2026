'use client';
import { useTransition } from 'react';
import { MailOpen, Trash2, Loader2 } from 'lucide-react';
import { deleteMessage, markAsRead } from '@/app/actions/message';
interface Props {
  id: string;
  type: 'read' | 'delete';
}
const BtnMessage = ({ id, type }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleAction = () => {
    startTransition(async () => {
      if (type === 'read') {
        await markAsRead(id);
      } else {
        if (confirm('')) {
          await deleteMessage(id);
        }
      }
    });
  };
  if (type === 'read') {
    return (
      <button
        className="p-2 text-gray-400 hover::text-green-400 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50"
        title="Mark as read"
        onClick={handleAction}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <MailOpen size={16} />
        )}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleAction}
        disabled={isPending}
        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
        title="Delete"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    );
  }
};

export default BtnMessage;
