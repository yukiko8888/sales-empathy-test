import React, { useState } from "react";
import "./EmpathyTest.css";  // EmpathyTest.css を適用


const questions = [
  {
    question: "顧客が『価格がちょっと高い』と言ったら？",
    options: [
      { text: "他の企業様もその点で迷われています。", type: "A" },
      { text: "価格を抑える方法もあります。例えば…", type: "C" },
      { text: "具体的にどの部分のコストが気になりますか？", type: "B" },
    ],
  },
  {
    question: "顧客が『導入するか迷っている』と言ったら？",
    options: [
      { text: "どういった点が気になっていますか？", type: "B" },
      { text: "気持ちはわかります。導入するのは勇気がいりますよね。", type: "A" },
      { text: "他の企業は導入して成功していますよ？", type: "C" },
    ],
  },
];

const results = {
  A: "💛 感情的共感タイプ：顧客の気持ちに寄り添い信頼を得るのが得意。ただし、決断を促す工夫が必要！",
  B: "💙 認知的共感タイプ：顧客の本音を引き出し、最適な提案ができる。ただし、冷たい印象を与えないよう注意！",
  C: "❤️ 論理的営業タイプ：データや実績を活かし、合理的に商談を進めるのが得意。ただし、共感をもう少し意識すると◎！",
};

export default function EmpathyTest() {
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);

  const calculateResult = (finalAnswers) => {
    const counts = finalAnswers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const highestType = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    setResult(results[highestType]);
  };

  const handleAnswer = (type) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, type];
      if (newAnswers.length === questions.length) {
        calculateResult(newAnswers);
      }
      return newAnswers;
    });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container">  // ここが重要！ className="container" にする
      <h1>🔥 営業向け共感力診断テスト 🔥</h1>
      {result ? (
        <div className="result">{result}</div>
      ) : (
        <div>
          <p className="question">{questions[currentIndex].question}</p>
          {questions[currentIndex].options.map((option) => (
            <button key={option.text} onClick={() => handleAnswer(option.type)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
