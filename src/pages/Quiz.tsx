
import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Book, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface QuizOption {
  a: string;
  b: string;
  c: string;
  d: string;
}

interface QuizQuestion {
  mcq: string;
  options: QuizOption;
  correct: string;
}

interface QuizData {
  mcqs: QuizQuestion[];
}

interface UserAnswer {
  questionIndex: number;
  selectedOption: string;
  isCorrect: boolean;
}

const Quiz = () => {
  const [textContent, setTextContent] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizLevel, setQuizLevel] = useState("Medium");
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!textContent) {
      toast.error("Please enter text content or a subject name");
      return;
    }

    setIsLoading(true);
    setQuizData(null);
    setUserAnswers([]);
    setQuizSubmitted(false);

    try {
      toast.info("Generating quiz questions...", {
        description: "This may take up to 1-2 minutes.",
        duration: 5000,
      });

      const response = await fetch("https://quizapp-butj.onrender.com/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text_content: textContent,
          num_questions: numQuestions,
          quiz_level: quizLevel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: QuizData = await response.json();
      setQuizData(data);
      setActiveQuestion(0);
      toast.success("Quiz generated successfully!");
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Failed to generate quiz. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
    const isCorrect = quizData?.mcqs[questionIndex].correct === selectedOption;
    
    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.questionIndex === questionIndex
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex] = {
        questionIndex,
        selectedOption,
        isCorrect,
      };
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers([...userAnswers, { questionIndex, selectedOption, isCorrect }]);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quizData) return;
    
    if (userAnswers.length < quizData.mcqs.length) {
      toast.warning("Please answer all questions before submitting");
      return;
    }
    
    setQuizSubmitted(true);
    
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
    const totalQuestions = quizData.mcqs.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    toast.success(`Quiz completed! Score: ${correctAnswers}/${totalQuestions} (${percentage}%)`);
  };

  const handleNextQuestion = () => {
    if (quizData && activeQuestion < quizData.mcqs.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!quizData) return { correct: 0, total: 0, percentage: 0 };
    
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
    const totalQuestions = quizData.mcqs.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    return { correct: correctAnswers, total: totalQuestions, percentage };
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! You've mastered this topic!";
    if (percentage >= 70) return "Great job! You have a good understanding.";
    if (percentage >= 50) return "Good effort! More practice will help you improve.";
    return "Keep practicing! You'll get better with time.";
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Book className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Quiz Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate custom quizzes based on any content or get GATE previous year questions for exam preparation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-6 md:p-8 rounded-2xl mb-8">
            <form onSubmit={handleGenerateQuiz} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="textContent">Text Content or Subject</Label>
                <Textarea
                  id="textContent"
                  placeholder="Enter text content to generate questions from or simply enter a subject name (e.g., 'Computer Networks', 'Operating Systems') for GATE PYQs"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  For detailed content-based questions, provide longer text. For GATE previous year questions, just enter the subject name.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="numQuestions">Number of Questions</Label>
                  <Input
                    id="numQuestions"
                    type="number"
                    min={1}
                    max={20}
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficultyLevel">Difficulty Level</Label>
                  <Select
                    value={quizLevel}
                    onValueChange={setQuizLevel}
                  >
                    <SelectTrigger id="difficultyLevel">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !textContent}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  <>Generate Quiz</>
                )}
              </Button>
            </form>
          </div>

          {isLoading && (
            <div className="glass-panel p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-semibold mb-4">Generating Quiz</h2>
              <Progress value={isLoading ? 75 : 0} className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Our AI is generating quiz questions based on your input. This might take up to 1-2 minutes depending on the complexity.
              </p>
            </div>
          )}

          {quizData && quizData.mcqs.length > 0 && (
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              {quizSubmitted ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
                    <div className="flex justify-center items-center mb-6">
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{calculateScore().percentage}%</span>
                        </div>
                        <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="3"
                            strokeDasharray={`${calculateScore().percentage}, 100`}
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-lg mb-4">{getScoreMessage(calculateScore().percentage)}</p>
                    <p className="text-md">
                      You got <span className="font-semibold text-primary">{calculateScore().correct}</span> out of{" "}
                      <span className="font-semibold">{calculateScore().total}</span> questions correct.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Review Questions</h3>
                    {quizData.mcqs.map((question, index) => {
                      const userAnswer = userAnswers.find(
                        (answer) => answer.questionIndex === index
                      );
                      return (
                        <Card key={index} className={userAnswer?.isCorrect ? "border-green-200" : "border-red-200"}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              Question {index + 1}
                              {userAnswer?.isCorrect ? (
                                <CheckCircle className="inline-block ml-2 text-green-500 h-5 w-5" />
                              ) : (
                                <XCircle className="inline-block ml-2 text-red-500 h-5 w-5" />
                              )}
                            </CardTitle>
                            <CardDescription>{question.mcq}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-2">
                              {Object.entries(question.options).map(([key, value]) => (
                                <div
                                  key={key}
                                  className={`flex items-center p-3 rounded-md border ${
                                    question.correct === key
                                      ? "bg-green-50 border-green-200"
                                      : userAnswer?.selectedOption === key && !userAnswer.isCorrect
                                      ? "bg-red-50 border-red-200"
                                      : "border-gray-200"
                                  }`}
                                >
                                  <div className="font-semibold mr-2">{key.toUpperCase()}.</div>
                                  <div>{value}</div>
                                  {question.correct === key && (
                                    <CheckCircle className="ml-auto text-green-500 h-4 w-4" />
                                  )}
                                  {userAnswer?.selectedOption === key && !userAnswer.isCorrect && (
                                    <XCircle className="ml-auto text-red-500 h-4 w-4" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex justify-center mt-8">
                    <Button onClick={() => {
                      setQuizData(null);
                      setUserAnswers([]);
                      setQuizSubmitted(false);
                    }}>
                      Generate New Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Quiz Time</h2>
                    <div className="text-sm bg-primary/10 px-3 py-1 rounded-full">
                      Question {activeQuestion + 1} of {quizData.mcqs.length}
                    </div>
                  </div>

                  <div className="mb-6">
                    <Progress
                      value={((activeQuestion + 1) / quizData.mcqs.length) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {quizData.mcqs[activeQuestion].mcq}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={
                            userAnswers.find(
                              (answer) => answer.questionIndex === activeQuestion
                            )?.selectedOption || ""
                          }
                          onValueChange={(value) =>
                            handleAnswerSelect(activeQuestion, value)
                          }
                          className="space-y-3"
                        >
                          {Object.entries(quizData.mcqs[activeQuestion].options).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50"
                              >
                                <RadioGroupItem value={key} id={`option-${key}`} />
                                <Label
                                  htmlFor={`option-${key}`}
                                  className="flex-1 cursor-pointer font-normal"
                                >
                                  <span className="font-semibold mr-2">
                                    {key.toUpperCase()}.
                                  </span>{" "}
                                  {value}
                                </Label>
                              </div>
                            )
                          )}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevQuestion}
                      disabled={activeQuestion === 0}
                    >
                      Previous
                    </Button>
                    
                    {activeQuestion < quizData.mcqs.length - 1 ? (
                      <Button onClick={handleNextQuestion}>Next</Button>
                    ) : (
                      <Button onClick={handleSubmitQuiz}>
                        Submit Quiz
                      </Button>
                    )}
                  </div>

                  <Separator className="my-8" />

                  <div className="grid grid-cols-10 gap-2">
                    {quizData.mcqs.map((_, index) => {
                      const answered = userAnswers.some(
                        (answer) => answer.questionIndex === index
                      );
                      return (
                        <Button
                          key={index}
                          variant={activeQuestion === index ? "default" : "outline"}
                          className={`h-10 w-10 p-0 ${
                            answered ? "bg-gray-100" : ""
                          } ${activeQuestion === index ? "!bg-primary" : ""}`}
                          onClick={() => setActiveQuestion(index)}
                        >
                          {index + 1}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Quiz;
