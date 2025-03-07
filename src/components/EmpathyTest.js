import React, { useState } from "react";
import "./EmpathyTest.css"; // CSS を適用

const questions = [
  {
    question: "顧客が『価格がちょっと高い』と言ったら？",
    options: [
      { text: "価格を抑える方法もあります。例えば…", type: "C" },
      { text: "確かにそうですよね。予算の制約は大きいですよね。", type: "A" },
      { text: "具体的にどの部分のコストが気になりますか？", type: "B" },
    ],
  },
  {
    question: "顧客が『導入するか迷っている』と言ったら？",
    options: [
      { text: "導入した企業はこのように成功していますよ。", type: "C" },
      { text: "導入を迷うポイントをもう少し詳しく教えていただけますか？", type: "B" },
      { text: "気持ちはわかります。導入するのは勇気がいりますよね。", type: "A" },
    ],
  },
  {
    question: "顧客が『他社と比較して決めたい』と言ったら？",
    options: [
      { text: "どのポイントで比較されていますか？", type: "B" },
      { text: "価格と実績で見れば、当社のほうが優れていますよ。", type: "C" },
      { text: "他社の製品も素晴らしいですよね！", type: "A" },
    ],
  },
  {
    question: "顧客が『社内決裁が通るか不安』と言ったら？",
    options: [
      { text: "決裁のポイントになりそうな点はどこでしょう？", type: "B" },
      { text: "決裁プロセスをサポートする資料をお出しできますが？", type: "C" },
      { text: "それは大変ですよね…。社内調整は面倒ですよね。", type: "A" },
    ],
  },
  {
    question: "顧客が『検討します』と言ったら？",
    options: [
      { text: "今日決めていただければ、特典がありますよ。", type: "C" },
      { text: "具体的にどんな点を検討されますか？", type: "B" },
      { text: "そうですよね。じっくり考えていただいて大丈夫です！", type: "A" },
    ],
  },
  {
    question: "顧客が『今はタイミングが悪い』と言ったら？",
    options: [
      { text: "確かにタイミングって大事ですよね。", type: "A" },
      { text: "今を逃すと、次の機会は厳しくなるかもしれませんよ？", type: "C" },
      { text: "どのような条件が揃えば導入しやすいですか？", type: "B" },
    ],
  },
  {
    question: "顧客が『特に問題はないので大丈夫です』と言ったら？",
    options: [
      { text: "たとえば、今後の業務で不安を感じるポイントはありますか？", type: "B" },
      { text: "では、また何かあればご連絡ください。", type: "C" },
      { text: "それは安心しました！", type: "A" },
    ],
  },
  {
    question: "顧客が『ちょっと考えさせてください』と言ったら？",
    options: [
      { text: "では、1週間後に連絡しますね。", type: "C" },
      { text: "わかります。決断には時間が必要ですよね。", type: "A" },
      { text: "何かご判断の材料としてお手伝いできることはありますか？", type: "B" },
    ],
  },
  {
    question: "商談の最初に、顧客があまり乗り気でない様子…どうする？",
    options: [
      { text: "では商品の説明を始めますね。", type: "C" },
      { text: "最近お忙しいですか？", type: "A" },
      { text: "今日はどんな話ができると有益でしょうか？", type: "B" },
    ],
  },
  {
    question: "顧客が『決裁者と相談しないといけない』と言ったら？",
    options: [
      { text: "決裁者の方もご多忙ですよね。", type: "A" },
      { text: "承認プロセスについて詳しく伺ってもいいですか？", type: "B" },
      { text: "他社様ではすでに導入を決めていますよ。", type: "C" },
    ],
  },
];

const results = {
  A: "💛 感情的共感タイプ：顧客の気持ちに寄り添い信頼を得るのが得意。ただし、決断を促す工夫が必要！",
  B: "💙 認知的共感タイプ：顧客の本音を引き出し、最適な提案ができる。ただし、冷たい印象を与えないよう注意！",
  C: "❤️ 論理的営業タイプ：データや実績を活かし、合理的に商談を進めるのが得意。ただし、共感をもう少し意識すると◎！",
};

const sendResultToGoogleSheets = (username, result) => {
  console.log("📤 データ送信開始:", username, result);

  fetch("https://script.google.com/a/macros/broadleaf.co.jp/s/AKfycbyyDkL1tgLNxV21_eGaC2Oa8CREhz8QlXATbQrUl6GLNHkGi2nslVip493x3pwQtTzp/exec", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, result }),
  })
    .then((response) => response.text()) // ✅ CORS対応のため `.json()` ではなく `.text()`
    .then((data) => console.log("✅ 送信成功:", data)) // ✅ 追加
    .catch((error) => console.error("🚨 送信エラー:", error));
};


export default function EmpathyTest() {
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);

  const calculateResult = (finalAnswers) => {
    console.log("🧮 診断集計開始:", finalAnswers); // ✅ 追加

    const counts = finalAnswers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const highestType = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    const finalResult = results[highestType];
    console.log("🏆 診断結果:", finalResult); // ✅ 追加

    setResult(finalResult);

    // ユーザー名を取得し、Googleスプレッドシートに送信
    const username = prompt("あなたの名前を入力してください:");
    if (username) {
      sendResultToGoogleSheets(username, finalResult);
    }
  };

  const handleAnswer = (type) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, type];
      if (newAnswers.length === questions.length) {
        calculateResult(newAnswers);
      }
      return newAnswers;
    });

    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < questions.length ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="container">
      <h1>🔥 共感タイプ診断 for Sales 🔥</h1>
      {result ? (
        <div className="result">{result}</div>
      ) : (
        questions[currentIndex] && (
          <div>
            <p className="question">{questions[currentIndex].question}</p>
            {questions[currentIndex].options.map((option) => (
              <button key={option.text} onClick={() => handleAnswer(option.type)}>
                {option.text}
              </button>
            ))}
          </div>
        )
      )}
    </div>
  );
}
