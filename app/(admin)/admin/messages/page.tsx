import { prisma } from '@/lib/prisma';
import { Mail, MailOpen, Trash2, Clock } from 'lucide-react';
import { deleteMessage, markAsRead } from './_actions/message'; // ✅ uncomment

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-white">Messages</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {unreadCount > 0 ? (
              <span className="text-red-400">{unreadCount} មិនទាន់អាន</span>
            ) : (
              'បានអានទាំងអស់ ✅'
            )}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-800 border border-white/10 rounded-lg px-4 py-2 text-center">
            <p className="text-lg font-semibold text-white">
              {messages.length}
            </p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="bg-gray-800 border border-red-500/20 rounded-lg px-4 py-2 text-center">
            <p className="text-lg font-semibold text-red-400">{unreadCount}</p>
            <p className="text-xs text-gray-400">Unread</p>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-gray-800 rounded-xl border border-white/10 overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Mail size={48} className="mb-4 opacity-20" />
            <p className="text-sm">មិនទាន់មានសំបុត្រទេ</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]
                  ${!message.read ? 'bg-blue-500/[0.04]' : ''}
                `}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  {message.name.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">
                      {message.name}
                    </p>
                    {!message.read && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                        ថ្មី
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-blue-400 mb-1">{message.email}</p>

                  {message.subject && (
                    <p className="text-xs font-medium text-gray-300 mb-1">
                      {message.subject}
                    </p>
                  )}

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {message.body}
                  </p>

                  {/* Time */}
                  <div className="flex items-center gap-1 mt-2">
                    <Clock size={11} className="text-gray-600" />
                    <p className="text-xs text-gray-600">
                      {new Date(message.createdAt).toLocaleString('km-KH')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* ✅ Mark as Read */}
                  {!message.read && (
                    <form action={markAsRead.bind(null, message.id)}>
                      <button
                        type="submit"
                        className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <MailOpen size={16} />
                      </button>
                    </form>
                  )}

                  {/* ✅ Delete */}
                  <form action={deleteMessage.bind(null, message.id)}>
                    <button
                      type="submit"
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
