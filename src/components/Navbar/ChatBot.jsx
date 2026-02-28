import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaExpand,
  FaTimes,
  FaPaperclip,
  FaStop
} from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import "./ChatBot.css";

const BASE_URL = "http://10.26.3.179:8080";

export default function ChatBot() {

  const [isOpen, setIsOpen] = useState(false);
  const [isMax, setIsMax] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chatEndRef = useRef(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= AUTO VOICE LISTEN ================= */
  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .toLowerCase()
          .trim();

      if (transcript.includes("hello anand")) {
        speak("Hello Anand. I am ready.");
        return;
      }

      sendToBackend(transcript);
    };

    recognition.onend = () => recognition.start();
    recognition.start();

  }, []);

  /* ================= SEND FUNCTION ================= */

  const sendToBackend = async (text) => {

    const cleanText = text?.trim();

    if (!cleanText && !selectedFile) return;

    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsTyping(true);

    try {

      let response;

      // ============ IMAGE CASE ============
      if (selectedFile) {

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("message", cleanText || "Explain this image");
        formData.append("language", language);

        response = await fetch(
          `${BASE_URL}/mediconnect/api/ai/chat`,
          {
            method: "POST",
            body: formData
          }
        );

        // Add user image message only when clicking SEND
        setMessages(prev => [
          ...prev,
          {
            sender: "user",
            type: "image",
            image: previewURL,
            text: cleanText
          }
        ]);

      } else {

        setMessages(prev => [
          ...prev,
          {
            sender: "user",
            type: "text",
            text: cleanText
          }
        ]);

        response = await fetch(
          `${BASE_URL}/mediconnect/api/ai/chat`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: cleanText,
              language: language
            })
          }
        );
      }

      if (!response.ok) throw new Error();

      const data = await response.text();

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          type: "text",
          text: data
        }
      ]);

      speak(data);

    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          type: "text",
          text: "⚠️ Unable to reach server."
        }
      ]);
    }

    setInput("");
    setSelectedFile(null);
    setPreviewURL(null);
    setIsTyping(false);
  };

  const sendMessage = () => {
    sendToBackend(input);
  };

  /* ================= FILE SELECT (NO AUTO SEND) ================= */

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  /* ================= SPEECH ================= */

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;

    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  /* ================= UI ================= */

  return (
    <>
      {!isOpen && (
        <div className="ai-orb" onClick={() => setIsOpen(true)}>
          <RiRobot2Line className="orb-icon" />
          <div className="pulse"></div>
        </div>
      )}

      {isOpen && (
        <div className={`chat-container ${isMax ? "max" : ""}`}>

          <div className="chat-header">
            <span>Anand AI</span>
            <div className="header-icons">
              <FaExpand onClick={() => setIsMax(!isMax)} />
              <FaTimes onClick={() => setIsOpen(false)} />
            </div>
          </div>

          <div className="chat-body">

            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>
                {m.type === "image" ? (
                  <div className="image-bubble">
                    <img src={m.image} alt="uploaded" />
                    {m.text && <div className="caption">{m.text}</div>}
                  </div>
                ) : (
                  <div className="text-bubble">
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {isTyping && <div className="typing">AI is typing...</div>}

            <div ref={chatEndRef}></div>

          </div>

          {/* IMAGE PREVIEW BEFORE SEND */}
          {previewURL && (
            <div className="preview-bar">
              <img src={previewURL} alt="preview" />
              <span>{selectedFile?.name}</span>
            </div>
          )}

          <div className="chat-footer">

            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
              <option value="kn">Kannada</option>
              <option value="ml">Malayalam</option>
              <option value="ur">Urdu</option>
            </select>

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />

            <FaPaperPlane className="icon-btn" onClick={sendMessage} />

            <label>
              <FaPaperclip className="icon-btn" />
              <input type="file" hidden onChange={handleFileSelect} />
            </label>

            <FaStop className="icon-btn" onClick={stopSpeaking} />

          </div>

          <div className="voice-status">
            {isSpeaking
              ? "Speaking..."
              : "Listening... Say 'Hello Anand'"}
          </div>

        </div>
      )}
    </>
  );
}