import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, PenLine } from 'lucide-react';

export default function ResponsePanel() {
  const [participantResponse, setParticipantResponse] = useState('');
  const [finalSubmission, setFinalSubmission] = useState('');
  const [score, setScore] = useState(null);
  const [latestSubmission, setLatestSubmission] = useState(null);

  const copyToSubmission = () => {
    setFinalSubmission(participantResponse);
  };

  const handleSubmitAndScore = () => {
    const fixedScore = 50;
    setScore(fixedScore);
    setLatestSubmission({
      submission: 1,
      response: finalSubmission,
      score: fixedScore
    });
  };

  const getScoreColor = (score) => {
    if (score < 50) return 'text-red-500';
    if (score < 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Your Response</h3>

      {/* Participant Response */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm mb-2 bg-[#5b5fc7] inline-block px-2 py-1 rounded">
          <PenLine className="w-4 h-4" />
          Sketchpad (draft your response here)
        </label>
        <Textarea
          value={participantResponse}
          onChange={(e) => setParticipantResponse(e.target.value)}
          placeholder="Enter your ideas here..."
          className="bg-[#4a5568] border-[#5a6578] text-white min-h-[150px]"
        />
      </div>

      {/* Copy Button */}
      <Button 
        onClick={copyToSubmission}
        className="bg-[#5a6578] hover:bg-[#6a7588] text-white w-full mb-4 flex items-center justify-center gap-2"
      >
        <Copy className="w-4 h-4" />
        Copy to Submission Box
      </Button>

      {/* Final Submission */}
      <div className="mb-4">
        <label className="block text-sm mb-2 bg-[#5b5fc7] inline-block px-2 py-1 rounded">
          💬 Final Submission
        </label>
        <Card className="bg-[#2d3748] border-[#4a5568] p-4 min-h-[100px]">
          <p className="text-sm text-gray-300">
            {finalSubmission}
          </p>
        </Card>
      </div>

      {/* Submit and Score Button */}
      <Button 
        onClick={handleSubmitAndScore}
        className="bg-[#5b5fc7] hover:bg-[#4a4fb0] text-white w-full mb-4"
      >
        Submit and Score
      </Button>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm mb-2 bg-[#4a5568] inline-block px-2 py-1 rounded">
          Status
        </label>
        <Card className="bg-[#2d3748] border-[#4a5568] p-4">
          <p className="text-sm">Scored 336 chars</p>
        </Card>
      </div>

      {/* Divergence Scale */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>0 - Very similar to AI</span>
          <span>100 - Very different from AI</span>
        </div>
        <div className="h-6 rounded-full overflow-hidden relative" style={{
          background: 'linear-gradient(to right, #ef4444, #f59e0b, #eab308, #84cc16, #22c55e, #10b981)'
        }}>
          {score && (
            <div 
              className="absolute top-0 h-full w-1 bg-white"
              style={{ left: `${score}%` }}
            />
          )}
        </div>
        {score && (
          <div className="text-center mt-2">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-sm text-gray-400 ml-2">Moderate divergence</span>
          </div>
        )}
      </div>

      {/* Score History */}
      <div>
        <h4 className="text-sm font-semibold mb-2">Score History</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#4a5568]">
                <th className="text-left py-2 pr-2">Submission</th>
                <th className="text-left py-2 px-2">Response</th>
                <th className="text-center py-2 px-2">Distinctiveness Score</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {latestSubmission && (
                <tr className="border-b border-[#4a5568]">
                  <td className="py-2 pr-2">{latestSubmission.submission}</td>
                  <td className="py-2 px-2">{latestSubmission.response}</td>
                  <td className="text-center py-2 px-2">{latestSubmission.score}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
