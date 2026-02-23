import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function ChatPanel({ messages, messageInput, setMessageInput, onSend, onClear, isLoading }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Chat with Bot</h3>

      {/* Chat Messages Area */}
      <div className="bg-[#2d3748] border border-[#4a5568] rounded-lg p-4 min-h-[300px] mb-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-3 text-sm">
            <div className="font-semibold text-[#5b5fc7] mb-1">
              {msg.role === 'user' ? '👤 You' : '🤖 Bot'}:
            </div>
            <div className="text-gray-300">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Bot is typing...</span>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="mb-4">
        <label className="block text-sm mb-2 bg-[#4a5568] inline-block px-2 py-1 rounded">
          Message
        </label>
        <Textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Enter anything..."
          className="bg-[#2d3748] border-[#4a5568] text-white min-h-[100px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={onSend}
          disabled={isLoading || !messageInput.trim()}
          className="bg-[#5b5fc7] hover:bg-[#4a4fb0] text-white disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
        </Button>
        <Button 
          onClick={onClear}
          variant="outline"
          className="bg-[#4a5568] hover:bg-[#5a6578] border-[#5a6578] text-white"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
