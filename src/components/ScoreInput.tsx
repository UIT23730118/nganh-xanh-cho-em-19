import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subjects } from "@/data/universities";
import { ExamScore } from "@/types";

interface ScoreInputProps {
  scores: ExamScore[];
  onScoresChange: (scores: ExamScore[]) => void;
  selectedBlock: string;
}

const ScoreInput = ({ scores, onScoresChange, selectedBlock }: ScoreInputProps) => {
  const [currentScores, setCurrentScores] = useState<Record<string, string>>(
    subjects.reduce((acc, subject) => {
      const existingScore = scores.find(s => s.subject === subject);
      acc[subject] = existingScore ? existingScore.score.toString() : '';
      return acc;
    }, {} as Record<string, string>)
  );

  const handleScoreChange = (subject: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, Math.min(10, parseFloat(value) || 0)).toString();
    setCurrentScores(prev => ({ ...prev, [subject]: numValue }));
    
    const newScores = subjects
      .map(subj => ({
        subject: subj,
        score: subj === subject ? (parseFloat(numValue) || 0) : (parseFloat(currentScores[subj]) || 0)
      }))
      .filter(score => score.score > 0);
    
    onScoresChange(newScores);
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl">Nhập Điểm Thi Đại Học</CardTitle>
        <CardDescription>
          Nhập điểm các môn thi của bạn (thang điểm 10). Hệ thống sẽ tự động tính điểm khối thi.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <div key={subject} className="space-y-2">
              <Label htmlFor={subject} className="text-sm font-medium">
                {subject}
              </Label>
              <Input
                id={subject}
                type="number"
                min="0"
                max="10"
                step="0.25"
                placeholder="0.0"
                value={currentScores[subject]}
                onChange={(e) => handleScoreChange(subject, e.target.value)}
                className="text-center"
              />
            </div>
          ))}
        </div>
        
        {selectedBlock && (
          <div className="mt-6 p-4 bg-success-light rounded-lg">
            <h4 className="font-semibold text-success mb-2">Khối thi đã chọn: {selectedBlock}</h4>
            <p className="text-sm text-muted-foreground">
              Điểm khối sẽ được tính tự động dựa trên 3 môn trong khối thi này.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreInput;