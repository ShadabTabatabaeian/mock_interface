import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';
import ResponsePanel from '@/components/ResponsePanel';
import { base44 } from '@/api/base44Client';

export default function IdeaExpansionStudy() {
  const [prolificId, setProlificId] = useState('this is a practice session');
  const [studyStarted, setStudyStarted] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (messageInput.trim() && !isLoading) {
      const userMessage = messageInput;
      setChatMessages([...chatMessages, { role: 'user', text: userMessage }]);
      setMessageInput('');
      setIsLoading(true);

      try {
        const response = await base44.integrations.Core.InvokeLLM({
          prompt: `You are a helpful AI assistant helping a participant brainstorm ideas for: "Design a new classroom tool that would help students stay focused without restricting their freedom."
          
User message: ${userMessage}

Provide helpful, creative suggestions and ask follow-up questions to help them develop their ideas. IMPORTANT: Keep your response under 180 characters.`,
        });

        setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
      } catch (error) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
    setMessageInput('');
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Practice session</h1>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm mb-2 bg-[#4a5568] inline-block px-2 py-1 rounded">
              Prolific ID
            </label>
            <Input
              value={prolificId}
              onChange={(e) => setProlificId(e.target.value)}
              className="bg-[#2d3748] border-[#4a5568] text-white"
            />
          </div>
          <Button 
            className="bg-[#5b5fc7] hover:bg-[#4a4fb0] text-white px-8 h-10"
            onClick={() => setStudyStarted(true)}
          >
            Start Study
          </Button>
        </div>
      </div>

      {studyStarted && (
        <>
          {/* Prompt Info */}
          <div className="text-sm text-gray-400 mb-4">
            Task 1 / 1 · Round 1 / 1 · Participant: {prolificId}
          </div>

          {/* Main Prompt Card */}
          <Card className="bg-[#2d3748] border-[#4a5568] p-6 mb-6">
            <div className="text-sm text-gray-400 mb-4">
              <p>Welcome! To start, please click the start button.</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Edit3 className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold text-white">Classroom Focus Enhancement</h2>
            </div>
            <div className="text-sm text-gray-400 space-y-3">
              <hr className="border-gray-600" />
              <p>A task instruction is shown below:</p>
              <p className="italic">"Design a new classroom tool that would help students stay focused without restricting their freedom."</p>
              <p>On the left panel, you will work with an AI chatbot. You may send messages to the chatbot by typing and clicking the "Send" button, and you will receive interactive responses. You may interact with it as many or as few times as you like (but please use it at least once).</p>
              <p>On the right panel, the "Sketchpad" allows you to draft and organize your response (please aim for 300–600 characters. Your submission will be blocked otherwise). When you're ready, click "Copy to Submission Box" to move your response to the submission box, then click "Submit and Score."</p>
              <p>You will complete five submissions per task, for a total of three tasks. After each submission, you will receive a Distinctiveness Score out of 100:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>A score closer to 0 means your response is very similar to a typical AI-generated response.</li>
                <li>A score of 50 indicates your response is moderately similar to a typical AI-generated response.</li>
                <li>A score closer to 100 means your response is very different from a typical AI-generated response.</li>
              </ul>
              <p>Your goal is to refine and develop your ideas so your submissions become increasingly distinct from the AI response. You will be able to see your response history and scores in a table after each submission, for a total of five submissions per task.</p>
              <p>Once you finish one task, click the "Continue" button to move on to the next.</p>
            </div>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Chat Panel */}
            <ChatPanel 
              messages={chatMessages}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
              onSend={handleSendMessage}
              onClear={handleClearChat}
              isLoading={isLoading}
            />

            {/* Response Panel */}
            <ResponsePanel />
          </div>
        </>
      )}
    </div>
  );
}
