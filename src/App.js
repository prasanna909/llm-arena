import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [chatgptAnswer, setChatgptAnswer] = useState("");
  const [geminiAnswer, setGeminiAnswer] = useState("");

  const handleCompare = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/ask?prompt=${encodeURIComponent(question)}`
      );

      const data = await response.json();

      setChatgptAnswer(data.chatgpt);
      setGeminiAnswer(data.gemini);
    } catch (error) {
      console.error(error);
      setChatgptAnswer("Backend connection failed");
      setGeminiAnswer("Backend connection failed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚀 LLM Arena</h1>

      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "400px",
          padding: "10px"
        }}
      />

      <button
        onClick={handleCompare}
        style={{
          marginLeft: "10px",
          padding: "10px"
        }}
      >
        Compare
      </button>

      <br />
      <br />

      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          marginBottom: "10px"
        }}
      >
        <h2>ChatGPT</h2>
        <p>{chatgptAnswer || "Answer will appear here"}</p>
      </div>

      <div
        style={{
          border: "1px solid black",
          padding: "10px"
        }}
      >
        <h2>Gemini</h2>
        <p>{geminiAnswer || "Answer will appear here"}</p>
      </div>
    </div>
  );
}

export default App;